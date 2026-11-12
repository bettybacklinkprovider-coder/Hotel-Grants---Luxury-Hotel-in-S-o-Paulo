import React, { useState } from 'react';
import { X, Calendar, Users, Maximize, Check, Wifi, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { Room, CurrencyCode } from '../types/hotel';
import { formatPrice, HOTEL_INFO } from '../data/hotelData';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onBookRoom: (roomId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
  currency,
  onBookRoom,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121a20] border border-slate-700 text-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative my-auto">
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 bg-[#0f172a] px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] tracking-widest text-[#c59b27] font-semibold uppercase block">
              Accommodations
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              {room.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Main Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
              <img
                src={room.gallery[activeImageIndex] || room.heroImage}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-xs text-[#c59b27] font-semibold">
                {room.view}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {room.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {room.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 aspect-[4/3] rounded overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#c59b27] scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#18232c] p-4 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Maximize className="w-4 h-4 text-[#c59b27]" />
              <div>
                <span className="text-[10px] text-slate-400 block">Room Size</span>
                <span className="font-semibold text-white">{room.sizeM2} m²</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-4 h-4 text-[#c59b27]" />
              <div>
                <span className="text-[10px] text-slate-400 block">Capacity</span>
                <span className="font-semibold text-white">Up to {room.capacityGuests} Guests</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-[#c59b27]" />
              <div>
                <span className="text-[10px] text-slate-400 block">Bed Configuration</span>
                <span className="font-semibold text-white">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#c59b27]" />
              <div>
                <span className="text-[10px] text-slate-400 block">View</span>
                <span className="font-semibold text-white">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-lg text-[#c59b27]">Room Description</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {room.fullDescription}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#c59b27]">Included Amenities & Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-[#18232c] p-2.5 rounded border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
              <span>Hotel Grants Stay Policies</span>
            </div>
            <p>
              Check-in from 14:00 (2:00 PM) · Check-out until 12:00 (12:00 PM) · Non-smoking suite · Daily complimentary housekeeping included.
            </p>
          </div>

          {/* Footer Action Strip */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Nightly Rate Starting At</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-3xl text-[#c59b27]">
                  {formatPrice(room.priceBRL, currency)}
                </span>
                <span className="text-xs text-slate-400">/ night</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room.id);
              }}
              className="w-full sm:w-auto px-8 py-3 rounded bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>Book {room.name} Now</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
