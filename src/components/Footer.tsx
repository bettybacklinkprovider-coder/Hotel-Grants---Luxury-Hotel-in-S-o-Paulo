import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Award, Shield, Heart } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onNavigate: (page: 'home' | 'rooms' | 'offers' | 'about') => void;
  onOpenBooking: () => void;
  onOpenReviewModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenReviewModal,
}) => {
  return (
    <footer className="bg-[#0b1319] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#c59b27] flex items-center justify-center text-slate-950 font-serif font-bold text-xl shadow-lg">
                HG
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white tracking-wide block">
                  HOTEL GRANTS
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#c59b27] uppercase font-semibold block">
                  SÃO PAULO · BRASIL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Hotel Grants offers boutique luxury, refined comfort, and genuine Brazilian hospitality in the heart of Vila Buarque, São Paulo.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#c59b27] text-xs font-semibold">
                <Award className="w-4 h-4" />
                <span>4.9 / 5.0 Star Rating</span>
              </div>
              <span className="text-slate-600">·</span>
              <button
                onClick={onOpenReviewModal}
                className="text-xs text-slate-400 hover:text-white underline transition-colors"
              >
                348 Verified Reviews
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (All 4 Pages) */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-lg text-white tracking-wide border-b border-slate-800 pb-2">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#c59b27] transition-colors flex items-center gap-1.5"
                >
                  <span>1. Home Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-[#c59b27] transition-colors flex items-center gap-1.5"
                >
                  <span>2. Rooms & Accommodation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#c59b27] transition-colors flex items-center gap-1.5"
                >
                  <span>3. Special Offers & Packages</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#c59b27] transition-colors flex items-center gap-1.5"
                >
                  <span>4. About Us & Contact</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="text-[#c59b27] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Book Your Stay Online →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-lg text-white tracking-wide border-b border-slate-800 pb-2">
              Hotel Information
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="hover:text-white font-medium transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(HOTEL_INFO.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>WhatsApp Reservation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Direct & Google Reviews QR */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white tracking-wide border-b border-slate-800 pb-2">
              Guest Satisfaction
            </h4>

            <div className="bg-[#121c24] border border-slate-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Rate Our Hotel</span>
                <span className="text-[10px] bg-[#c59b27]/20 text-[#c59b27] px-2 py-0.5 rounded font-bold">
                  Google Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Have you stayed at Hotel Grants? Leave us a review on Google or scan our QR code.
              </p>
              <button
                onClick={onOpenReviewModal}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-2 border border-slate-700"
              >
                <span>Write a Review / View QR Code</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Hotel Grants (São Paulo, SP - Brasil). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#c59b27]" />
              Best Rate Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Brazilian Hospitality
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
