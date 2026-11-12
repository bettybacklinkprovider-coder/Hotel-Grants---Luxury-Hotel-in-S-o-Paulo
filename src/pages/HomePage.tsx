import React, { useState } from 'react';
import { 
  Calendar, Users, ArrowRight, Star, Wifi, Utensils, Clock, Car, ShieldCheck, 
  Wine, MessageCircle, MapPin, Phone, Award, Sparkles, ChevronRight, CheckCircle2, 
  QrCode, ExternalLink, Coffee
} from 'lucide-react';
import { HOTEL_INFO, HOTEL_ROOMS, SPECIAL_OFFERS, GUEST_REVIEWS, HOTEL_FACILITIES, formatPrice } from '../data/hotelData';
import { CurrencyCode } from '../types/hotel';

interface HomePageProps {
  onNavigate: (page: 'home' | 'rooms' | 'offers' | 'about') => void;
  currency: CurrencyCode;
  onOpenBooking: (roomId?: string, offerCode?: string) => void;
  onSelectRoomDetails: (roomId: string) => void;
  onOpenReviewModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currency,
  onOpenBooking,
  onSelectRoomDetails,
  onOpenReviewModal,
}) => {
  // Quick Search Bar state
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [quickCheckIn, setQuickCheckIn] = useState(formatDate(tomorrow));
  const [quickCheckOut, setQuickCheckOut] = useState(formatDate(dayAfterTomorrow));
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickRoom, setQuickRoom] = useState(HOTEL_ROOMS[0].id);

  const handleQuickBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(quickRoom);
  };

  return (
    <div className="w-full space-y-0">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
         ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTEL_ROOMS[0].heroImage}
            alt="Hotel Grants Luxury Entrance"
            className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-[#0f172a]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col items-center text-center space-y-8">
          
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-wider uppercase shadow-lg">
            <Award className="w-4 h-4" />
            <span>São Paulo Boutique Hotel · Vila Buarque</span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white drop-shadow-md">
              Experience Comfort, Elegance & Exceptional Hospitality.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
              Welcome to <strong className="font-semibold text-white">Hotel Grants</strong>. A premier luxury destination in São Paulo offering tranquil suites, artisanal gastronomy, and dedicated 24-hour service.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] hover:to-[#b58c1c] text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>

            <button
              onClick={() => onNavigate('rooms')}
              className="w-full sm:w-auto px-8 py-4 rounded bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest transition-all border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <span>Explore Rooms</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27]" />
            </button>
          </div>

          {/* Booking Bar Widget */}
          <div className="w-full max-w-5xl pt-6">
            <form
              onSubmit={handleQuickBookingSearch}
              className="bg-[#121a20]/90 backdrop-blur-xl border border-slate-700/80 rounded-xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left"
            >
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Check-In
                </label>
                <input
                  type="date"
                  value={quickCheckIn}
                  onChange={(e) => setQuickCheckIn(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Check-Out
                </label>
                <input
                  type="date"
                  value={quickCheckOut}
                  onChange={(e) => setQuickCheckOut(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Guests
                </label>
                <select
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Room Option
                </label>
                <select
                  value={quickRoom}
                  onChange={(e) => setQuickRoom(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                >
                  {HOTEL_ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Check Availability</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT HOTEL GRANTS
         ========================================================================= */}
      <section className="py-20 bg-[#faf8f5] text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                  About Hotel Grants
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                  Refined Comfort in the Cultural Heart of São Paulo
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm">
                Situated at <strong>R. Amaral Gurgel, 380 - Vila Buarque</strong>, Hotel Grants offers an oasis of quiet sophisticated comfort in central São Paulo. Surrounded by architectural landmarks, world-class gastronomy, and vibrant cultural hubs, our boutique hotel is designed for leisure travelers, romantic getaways, and business executives alike.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="font-serif font-bold text-2xl text-[#c59b27] block">24/7</span>
                  <span className="text-xs font-semibold text-slate-800">Bespoke Concierge Care</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Always ready to assist with reservations and city tours.</p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="font-serif font-bold text-2xl text-[#c59b27] block">4.9 ★</span>
                  <span className="text-xs font-semibold text-slate-800">Guest Rating Satisfaction</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Over 340 verified reviews on Google & travel platforms.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#121a20] hover:bg-slate-800 text-white font-semibold text-xs rounded transition-colors uppercase tracking-wider"
                >
                  <span>Read Full Hotel Grants Story</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27]" />
                </button>
              </div>
            </div>

            {/* Right Photo Mosaic */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={HOTEL_ROOMS[1].heroImage}
                    alt="Hotel Grants Suite"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={HOTEL_ROOMS[0].gallery[2] || HOTEL_ROOMS[0].heroImage}
                    alt="Hotel Grants Dining"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ROOMS & ACCOMMODATION SHOWCASE
         ========================================================================= */}
      <section className="py-20 bg-[#121a20] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                Accommodations
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
                Featured Suites & Guest Rooms
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Every room at Hotel Grants features premium bedding, soundproof acoustic windows, fast Wi-Fi 6, and luxury bath amenities.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rooms')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded transition-colors uppercase tracking-wider shrink-0 border border-slate-700"
            >
              <span>View All Rooms (5)</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27]" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOTEL_ROOMS.filter((r) => r.featured).map((room) => (
              <div
                key={room.id}
                className="bg-[#18232c] border border-slate-800 hover:border-[#c59b27]/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
              >
                {/* Photo Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={room.heroImage}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-[#c59b27]">
                    {room.sizeM2} m² · {room.capacityGuests} Guests
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#c59b27] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">From</span>
                      <span className="font-serif font-bold text-2xl text-[#c59b27]">
                        {formatPrice(room.priceBRL, currency)}
                      </span>
                      <span className="text-[10px] text-slate-400"> / night</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectRoomDetails(room.id)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="px-4 py-2 bg-[#c59b27] hover:bg-[#d8ab2e] text-slate-950 text-xs font-bold rounded transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOTEL FACILITIES & AMENITIES
         ========================================================================= */}
      <section className="py-20 bg-[#faf8f5] text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
              Hotel Facilities
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
              Tailored Amenities for Maximum Comfort
            </h2>
            <p className="text-slate-600 text-sm">
              Discover verified services offered on-site at Hotel Grants to make your São Paulo stay effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOTEL_FACILITIES.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#c59b27]/50 transition-all flex flex-col group"
              >
                {/* Facility Image Cover */}
                {facility.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#c59b27] text-slate-950 flex items-center justify-center font-bold shadow-md">
                      {idx === 0 && <Wifi className="w-5 h-5" />}
                      {idx === 1 && <Utensils className="w-5 h-5" />}
                      {idx === 2 && <Clock className="w-5 h-5" />}
                      {idx === 3 && <Car className="w-5 h-5" />}
                      {idx === 4 && <Sparkles className="w-5 h-5" />}
                      {idx === 5 && <Wine className="w-5 h-5" />}
                      {idx === 6 && <Coffee className="w-5 h-5" />}
                      {idx === 7 && <ShieldCheck className="w-5 h-5" />}
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#c59b27] transition-colors">
                      {facility.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> On-site verified
                    </span>
                    <span className="text-[#c59b27] font-semibold">Hotel Grants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CUSTOMER REVIEWS & TESTIMONIALS (PREMIUM SECTION)
         ========================================================================= */}
      <section className="py-20 bg-[#121a20] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header & Rating Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#18232c] border border-slate-800 rounded-2xl p-6 lg:p-8">
            
            {/* Left: Overall Score */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r border-slate-800 lg:pr-8">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                Guest Experience Score
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="font-serif font-bold text-5xl sm:text-6xl text-white">4.9</span>
                <div>
                  <div className="flex items-center text-[#c59b27]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c59b27]" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 block mt-1">348 Verified Guest Ratings</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Discover why travelers consistently choose Hotel Grants for warmth, comfort, and memorable stays.
              </p>
              <button
                onClick={onOpenReviewModal}
                className="w-full py-2.5 bg-[#c59b27] hover:bg-[#d8ab2e] text-slate-950 font-bold text-xs rounded transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Review Us on Google / View QR</span>
              </button>
            </div>

            {/* Middle: Star Breakdown Percentage Bars */}
            <div className="lg:col-span-5 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Rating Breakdown
              </h4>
              {HOTEL_INFO.starBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-slate-400 font-medium">{item.stars} Stars</span>
                  <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c59b27] to-[#d8ab2e] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-400">{item.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Right: Verified Badges */}
            <div className="lg:col-span-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Google Verified</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Genuine guest reviews collected from Google Maps and direct verified reservations.
              </p>
              <a
                href={HOTEL_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#c59b27] hover:underline font-semibold"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Testimonial Cards (3 per row) */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white text-center">
              What Our Guests Say
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUEST_REVIEWS.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-[#18232c] border border-slate-800 rounded-xl p-6 space-y-4 shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#c59b27]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c59b27]" />
                        ))}
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                        {review.source}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{review.author}</span>
                      <span className="text-[11px] text-slate-400 block">{review.location}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SPECIAL OFFERS & CONTACT / LOCATION MAP
         ========================================================================= */}
      <section className="py-20 bg-[#faf8f5] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Offers Preview */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                  Promotions & Packages
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
                  Exclusive Hotel Offers
                </h2>
                <p className="text-slate-600 text-sm">
                  Enjoy seasonal promotions, romantic packages, and extended stay discounts.
                </p>
              </div>

              <button
                onClick={() => onNavigate('offers')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121a20] hover:bg-slate-800 text-white text-xs font-bold rounded transition-colors uppercase tracking-wider shrink-0"
              >
                <span>View All Offers (5)</span>
                <ArrowRight className="w-4 h-4 text-[#c59b27]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPECIAL_OFFERS.slice(0, 3).map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#c59b27] text-slate-950 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {offer.badge}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-xl text-slate-900">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Package Rate</span>
                        <span className="font-serif font-bold text-2xl text-[#c59b27]">
                          {formatPrice(offer.priceBRL, currency)}
                        </span>
                      </div>

                      <button
                        onClick={() => onOpenBooking(undefined, offer.code)}
                        className="px-4 py-2 bg-[#121a20] hover:bg-slate-800 text-white font-bold text-xs rounded transition-colors"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Contact Grid */}
          <div className="bg-[#121a20] text-white rounded-2xl p-8 lg:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                  Find Us in São Paulo
                </span>
                <h3 className="font-serif font-bold text-3xl text-white">
                  Hotel Grants Location & Contact
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located in the vibrant Vila Buarque district, moments away from Santa Cecília subway station, Avenida Paulista, and top dining spots.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Address:</strong>
                    <span className="text-slate-300">{HOTEL_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#c59b27] shrink-0" />
                  <div>
                    <strong className="text-white block">Phone / WhatsApp:</strong>
                    <a href={`tel:${HOTEL_INFO.phone}`} className="text-slate-300 hover:text-white underline">
                      {HOTEL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-emerald-400 block">Instant WhatsApp Reservation:</strong>
                    <a
                      href={`${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(HOTEL_INFO.whatsappDefaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Click here to chat on WhatsApp (+55 11 98612-0400)
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 bg-[#c59b27] hover:bg-[#d8ab2e] text-slate-950 font-bold text-xs rounded transition-colors uppercase tracking-wider"
                >
                  Contact Page & Directions
                </button>
              </div>
            </div>

            {/* Google Maps Embed Frame */}
            <div className="lg:col-span-7 h-80 lg:h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-700 relative">
              <iframe
                title="Hotel Grants Location Map"
                src={HOTEL_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
