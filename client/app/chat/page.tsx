import React from "react";
import Image from "next/image";
import { MailCheckIcon } from "lucide-react";

const ChatInterface = () => {
  const messages = [
    {
      id: 1,
      sender: "Mercy Wangari",
      message: "Hi, can I add something to my order",
      timestamp: "2 min ago",
      isUser: true,
    },
    {
      id: 2,
      sender: "Alex Mathieu",
      message: "Hi, sure which item would you like to add?",
      timestamp: "1 min ago",
      isUser: false,
    },
    {
      id: 3,
      sender: "Mercy Wangari",
      message: "Hi, can I add something to my order",
      timestamp: "2 min ago",
      isUser: true,
    },
    {
      id: 4,
      sender: "Alex Mathieu",
      message: "Hi, sure which item would you like to add?",
      timestamp: "1 min ago",
      isUser: false,
    },
  ];

  const contactTypes = ["Email", "Text", "Call", "Note"];
  const socialIcons = [
    { icon: MailCheckIcon, color: "text-green-500" },
    { icon: MailCheckIcon, color: "text-gray-500" },
    { icon: MailCheckIcon, color: "text-blue-500" },
    { icon: MailCheckIcon, color: "text-blue-400" },
    { icon: MailCheckIcon, color: "text-blue-600" },
    { icon: MailCheckIcon, color: "text-blue-500" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 p-4">
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
                height={30}
                width={30}
              />
              <div>
                <p className="font-medium">Mercy Wangari</p>
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
                    height={30}
                    width={30}
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
                    height={30}
                    width={30}
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
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 text-green-500 hover:bg-green-50 rounded-full">
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
              <p className="font-medium">Mercy Wangari</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm">mercy@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone number</p>
              <p className="text-sm">0712345678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm">US & Canada</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Preferred communication</p>
              <p className="text-sm">WhatsApp</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-sm">Buy a tractor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
