import React, { useState } from 'react';
import { 
  Sparkles, Check, Calendar, Tag, ShieldCheck, ChevronDown, ChevronUp, MessageCircle, ArrowRight
} from 'lucide-react';
import { SPECIAL_OFFERS, HOTEL_FAQS, formatPrice, HOTEL_INFO } from '../data/hotelData';
import { CurrencyCode } from '../types/hotel';

interface OffersPageProps {
  currency: CurrencyCode;
  onOpenBooking: (roomId?: string, offerCode?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  currency,
  onOpenBooking,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredOffer = SPECIAL_OFFERS[0];

  return (
    <div className="w-full bg-[#faf8f5] text-slate-900 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#121a20] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c59b27]/20 text-[#c59b27] text-xs font-semibold uppercase tracking-widest border border-[#c59b27]/30">
            Hotel Grants · Page 3 of 4
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            Special Offers & Hotel Packages
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover curated hotel packages designed for romantic getaways, business trips, weekend breaks, and extended stays in São Paulo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Featured Offer Banner */}
        <div className="bg-gradient-to-r from-[#121a20] to-[#1a2833] text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <div className="lg:col-span-7 p-8 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#c59b27] text-slate-950 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  Featured Seasonal Special
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Code: {featuredOffer.code}
                </span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
                {featuredOffer.title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {featuredOffer.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider block">
                  Package Inclusions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {featuredOffer.includedFeatures.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Package Rate Starting At</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-3xl text-[#c59b27]">
                    {formatPrice(featuredOffer.priceBRL, currency)}
                  </span>
                  {featuredOffer.originalPriceBRL && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(featuredOffer.originalPriceBRL, currency)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, featuredOffer.code)}
                className="px-8 py-3 bg-[#c59b27] hover:bg-[#d8ab2e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-lg"
              >
                Book This Special Offer
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-slate-900">
            <img
              src={featuredOffer.image}
              alt={featuredOffer.title}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* All Special Offer Cards Grid */}
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-2xl text-slate-900 border-b border-slate-200 pb-2">
            All Hotel Grants Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIAL_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#c59b27] text-slate-950 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {offer.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Min Stay: {offer.minNights} Night(s)</span>
                      <span className="font-mono text-emerald-700 font-bold">PROMO: {offer.code}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-slate-900">
                      {offer.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 pt-2">
                      {offer.includedFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conditions & Action */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <p className="text-[11px] text-slate-400 italic">
                      Condition: {offer.bookingConditions}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Offer Price</span>
                        <span className="font-serif font-bold text-2xl text-[#c59b27]">
                          {formatPrice(offer.priceBRL, currency)}
                        </span>
                      </div>

                      <button
                        onClick={() => onOpenBooking(undefined, offer.code)}
                        className="px-5 py-2.5 bg-[#121a20] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                      >
                        Book Offer
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offers FAQ Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
              Package FAQs
            </span>
            <h2 className="font-serif font-bold text-2xl text-slate-900">
              Frequently Asked Questions About Offers
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {HOTEL_FAQS.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#c59b27] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1 animate-in fade-in duration-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
