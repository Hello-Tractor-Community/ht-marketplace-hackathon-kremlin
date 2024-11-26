from django.http import HttpResponsePermanentRedirect


class HttpsRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if (
            not request.is_secure()
            and not request.META.get("HTTP_X_FORWARDED_PROTO", "") == "https"
        ):
            if request.method == "GET":
                domain = request.get_host()
                return HttpResponsePermanentRedirect(
                    f"https://{domain}{request.get_full_path()}"
                )

        return self.get_response(request)
