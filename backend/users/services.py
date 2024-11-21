from typing import Dict
from urllib.parse import urlencode

import jwt
import requests
from attrs import define
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.crypto import get_random_string


@define
class GoogleRawLoginCredentials:
    client_id: str
    client_secret: str
    project_id: str


@define
class GoogleAuthToken:
    id_token: str
    access_token: str

    def decode_id_token(self) -> Dict[str, str]:
        id_token = self.id_token
        decoded_token = jwt.decode(jwt=id_token, options={"verify_signature": False})
        return decoded_token


class GoogleRawLoginFlowService:
    API_URI = "/api/auth/google/callback/"
    GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth"
    GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
    GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

    SCOPES = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
    ]

    def __init__(self) -> None:
        self._credentials = self._get_google_raw_login_credentials()

    def _get_google_raw_login_credentials(self) -> GoogleRawLoginCredentials:
        client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
        client_secret = settings.GOOGLE_OAUTH2_CLIENT_SECRET
        project_id = settings.GOOGLE_PROJECT_ID

        if not client_id:
            raise ImproperlyConfigured("GOOGLE_OAUTH2_CLIENT_ID is required")
        if not client_secret:
            raise ImproperlyConfigured("GOOGLE_OAUTH2_CLIENT_SECRET is required")
        if not project_id:
            raise ImproperlyConfigured("GOOGLE_PROJECT_ID is required")

        creds = GoogleRawLoginCredentials(
            client_id=client_id, client_secret=client_secret, project_id=project_id
        )
        return creds

    @staticmethod
    def _generate_state_session_token(length=30):
        state = get_random_string(length)
        return state

    def _get_redirect_uri(self):
        domain = settings.KREMLIN_URL
        api_uri = self.API_URI
        proto = "http" if settings.DEBUG else "https"
        redirect_uri = f"{proto}://{domain}{api_uri}"
        return redirect_uri

    def get_authorization_url(self):
        redirect_uri = self._get_redirect_uri()
        state = self._generate_state_session_token()

        params = {
            "response_type": "code",
            "client_id": self._credentials.client_id,
            "redirect_uri": redirect_uri,
            "scope": " ".join(self.SCOPES),
            "state": state,
            "access_type": "offline",
            "include_granted_scopes": "true",
            "prompt": "select_account",
        }

        query_params = urlencode(params)
        authorization_url = f"{self.GOOGLE_AUTH_URL}?{query_params}"
        return authorization_url, state

    def get_tokens(self, *, code: str) -> GoogleAuthToken:
        redirect_uri = self._get_redirect_uri()

        data = {
            "code": code,
            "client_id": self._credentials.client_id,
            "client_secret": self._credentials.client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }

        response = requests.post(self.GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

        if not response.ok:
            raise Exception(
                f"Failed to obtain access token from google: {response.text}"
            )

        tokens = response.json()
        id_token = tokens.get("id_token")
        access_token = tokens.get("access_token")
        google_oauth_token = GoogleAuthToken(
            id_token=id_token, access_token=access_token
        )

        return google_oauth_token

    def get_user_info(self, *, auth_token: GoogleAuthToken):
        access_token = auth_token.access_token

        response = requests.get(
            self.GOOGLE_USER_INFO_URL, params={"access_token": access_token}
        )

        if not response.ok:
            raise Exception(f"Failed to obtain user info from Google: {response.text}")

        return response.json()
