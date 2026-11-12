import React, { useState } from 'react';
import { 
  Maximize, Users, Check, Wifi, Sparkles, ShieldCheck, Calendar, Filter, 
  ChevronRight, Coffee, Info, ArrowRight, Star
} from 'lucide-react';
import { HOTEL_ROOMS, HOTEL_INFO, formatPrice } from '../data/hotelData';
import { CurrencyCode } from '../types/hotel';

interface RoomsPageProps {
  currency: CurrencyCode;
  onOpenBooking: (roomId?: string) => void;
  onSelectRoomDetails: (roomId: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  currency,
  onOpenBooking,
  onSelectRoomDetails,
}) => {
  const [capacityFilter, setCapacityFilter] = useState<number | 'all'>('all');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'default'>('default');

  // Filtering
  let roomsList = HOTEL_ROOMS.filter((room) => {
    if (capacityFilter === 'all') return true;
    return room.capacityGuests >= capacityFilter;
  });

  if (priceSort === 'asc') {
    roomsList = [...roomsList].sort((a, b) => a.priceBRL - b.priceBRL);
  } else if (priceSort === 'desc') {
    roomsList = [...roomsList].sort((a, b) => b.priceBRL - a.priceBRL);
  }

  return (
    <div className="w-full bg-[#faf8f5] text-slate-900 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#121a20] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c59b27]/20 text-[#c59b27] text-xs font-semibold uppercase tracking-widest border border-[#c59b27]/30">
            Hotel Grants · Page 2 of 4
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Rooms & Accommodations
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Choose from our collection of refined suites and rooms in Vila Buarque, São Paulo. Every stay includes artisanal breakfast, fast Wi-Fi 6, and 24-hour service.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Info & Filters Strip */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Check In Info */}
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Check-In Time</span>
              <strong className="text-slate-900 font-semibold">{HOTEL_INFO.checkInTime}</strong>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Check-Out Time</span>
              <strong className="text-slate-900 font-semibold">{HOTEL_INFO.checkOutTime}</strong>
            </div>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Filter className="w-4 h-4 text-[#c59b27]" />
              <span>Min Capacity:</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setCapacityFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  capacityFilter === 'all' ? 'bg-[#121a20] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => setCapacityFilter(2)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  capacityFilter === 2 ? 'bg-[#121a20] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2+ Guests
              </button>
              <button
                onClick={() => setCapacityFilter(3)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  capacityFilter === 3 ? 'bg-[#121a20] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3+ Guests
              </button>
            </div>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 rounded p-1.5 focus:outline-none"
            >
              <option value="default">Sort: Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Room Catalog Cards */}
        <div className="space-y-8">
          {roomsList.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              
              {/* Photo Column */}
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-slate-900">
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#121a20]/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-[#c59b27]">
                  {room.sizeM2} m² · {room.view}
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-widest">
                      {room.bedType}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      Capacity: {room.capacityGuests} Guests
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-2xl lg:text-3xl text-slate-900">
                    {room.name}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {room.fullDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {room.amenities.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Action Strip */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rate Per Night</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif font-bold text-3xl text-[#c59b27]">
                        {formatPrice(room.priceBRL, currency)}
                      </span>
                      <span className="text-xs text-slate-500">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectRoomDetails(room.id)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded transition-colors"
                    >
                      View Details & Gallery
                    </button>

                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="px-6 py-2.5 bg-[#121a20] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4 text-[#c59b27]" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
