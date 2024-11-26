"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";

import {
  Whatsapp,
  Envelope,
  Messenger,
  Twitter,
  Facebook,
  SkypeIcon,
} from "lucide-react";

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  isUser: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredCommunication: string;
  description: string;
}

interface SocialIcon {
  icon: React.ComponentType<{ size?: number, color?: string }>;
  color: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Mercy Wangari",
    email: "mercy@gmail.com",
    phone: "0712345678",
    address: "US & Canada",
    preferredCommunication: "WhatsApp",
    description: "Buy a tractor"
  });

  const contactTypes = ["Email", "Text", "Call", "Note"];
  const socialIcons = [
    { icon: Whatsapp, color: "text-green-500" },
    { icon: Envelope, color: "text-gray-500" },
    { icon: Messenger, color: "text-blue-500" },
    { icon: Twitter, color: "text-blue-400" },
    { icon: Facebook, color: "text-blue-600" },
    { icon: SkypeIcon, color: "text-blue-500" },
  ];

  // Establish WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://kremlin.share-hub.co/core/conversations');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      // Optionally send initial connection message or authentication
    };

    ws.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data);
        const newMsg: Message = {
          id: Date.now(),
          sender: receivedMessage.sender || 'System',
          message: receivedMessage.message,
          timestamp: new Date().toLocaleTimeString(),
          isUser: false
        };
        setMessages(prevMessages => [...prevMessages, newMsg]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // Send message handler
  const sendMessage = useCallback(() => {
    if (socket && newMessage.trim() && socket.readyState === WebSocket.OPEN) {
      const messageToSend = {
        sender: userProfile.name,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };

      // Send message via WebSocket
      socket.send(JSON.stringify(messageToSend));

      // Add message to local state
      const newMsg: Message = {
        id: Date.now(),
        ...messageToSend,
        isUser: true
      };
      setMessages(prevMessages => [...prevMessages, newMsg]);
      
      // Clear input
      setNewMessage('');
    }
  }, [socket, newMessage, userProfile]);

  // Handle input key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
       <div className="border-t border-gray-200">
        <div className="flex justify-center space-x-4 p-4 border-b border-gray-200">
          {socialIcons.map((social, index) => {
            const Icon = social.icon;
            return (
              <button
                key={index}
                className={`p-2 rounded-full hover:bg-gray-100 ${social.color}`}
              >
                {/* <Icon size={20} /> */}
              </button>
            );
          })}
        </div>


      <div className="flex w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Chatting Activity</h2>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/api/placeholder/40/40"
                alt="User"
                className="w-10 h-10 rounded-full"
                height={40}
                width={40}
              />
              <div>
                <p className="font-medium">{userProfile.name}</p>
                <p className="text-sm text-gray-500">(Buyer)</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Contact type</p>
            <div className="flex flex-wrap gap-2">
              {contactTypes.map((type) => (
                <button
                  key={type}
                  className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:bg-gray-50"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isUser && (
                  <Image
                    src="/api/placeholder/32/32"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                    height={32}
                    width={32}
                  />
                )}
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    msg.isUser
                      ? "bg-green-50 text-green-900"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm font-medium">{msg.sender}</p>
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
                {msg.isUser && (
                  <Image
                    src="/api/placeholder/32/32"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full ml-2"
                    height={32}
                    width={32}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="border-t border-gray-200">
            <div className="flex justify-center space-x-4 p-4 border-b border-gray-200">
              {socialIcons.map((social, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-full hover:bg-gray-100 ${social.color}`}
                >
                  {/* <social.icon size={20} /> */}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={sendMessage}
                  className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 border-l border-gray-200 p-4">
          <h2 className="font-semibold mb-4">Account owner</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{userProfile.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone number</p>
              <p className="text-sm">{userProfile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm">{userProfile.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Preferred communication</p>
              <p className="text-sm">{userProfile.preferredCommunication}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-sm">{userProfile.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChatInterface;