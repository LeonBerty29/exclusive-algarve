"use client"

import React 
// , { useState } 
from "react";
import { Phone, Mail
    // , X 
} from "lucide-react";
// import { IoInformationOutline } from "react-icons/io5";


export const FloatingContact = () => {
//   const [isOpen, setIsOpen] = useState(true);
const isOpen = true

  const handleCall = () => {
    window.location.href = "tel:+351918024082";
  };

  const handleMessage = () => {
    window.location.href = "mailto:info@exclusivealgarvevillas.com";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Action Buttons - Show when open */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-200">
          {/* Call Button */}
          <button
            onClick={handleCall}
            className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg px-4 py-3 transition-all duration-200 hover:scale-105"
            aria-label="Call us"
          >
            {/* <span className="text-sm font-medium whitespace-nowrap">
              Call Us
            </span> */}
            <div className="bg-green-500 p-2 rounded-full group-hover:bg-green-600 transition-colors">
              <Phone className="size-4 text-white" />
            </div>
          </button>

          {/* Message Button */}
          <button
            onClick={handleMessage}
            className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg px-4 py-3 transition-all duration-200 hover:scale-105"
            aria-label="Message us"
          >
            {/* <span className="text-sm font-medium whitespace-nowrap">
              Message Us
            </span> */}
            <div className="bg-blue-500 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
              {/* <MessageCircle className="size-4 text-white" /> */}
              <Mail className="size-4 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-xl p-3 lg:p-4 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
        //   <MessageCircle className="w-6 h-6" />
          <IoInformationOutline className="w-6 h-6" />
        )}
      </button> */}
    </div>
  );
};
