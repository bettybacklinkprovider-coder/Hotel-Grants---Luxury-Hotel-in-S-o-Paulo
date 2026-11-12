import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(
    HOTEL_INFO.whatsappDefaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="bg-[#121a20] border border-slate-700 text-white rounded-xl shadow-2xl p-3.5 max-w-xs text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400">Hotel Grants Concierge</span>
          </div>
          
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Need quick answers about rooms or pricing? Chat with us live on WhatsApp!
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 font-bold hover:underline text-xs"
          >
            <span>+55 11 98612-0400</span>
            <span>→</span>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp with Hotel Grants"
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        {/* Floating Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-slate-900">
          24/7
        </span>
      </a>
    </div>
  );
};
