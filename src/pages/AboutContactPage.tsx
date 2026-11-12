import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2, ShieldCheck, Award, Navigation, ExternalLink 
} from 'lucide-react';
import { HOTEL_INFO, HOTEL_IMAGES } from '../data/hotelData';

export const AboutContactPage: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState('General Information');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senderName.trim() && senderEmail.trim() && message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#faf8f5] text-slate-900 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#121a20] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c59b27]/20 text-[#c59b27] text-xs font-semibold uppercase tracking-widest border border-[#c59b27]/30">
            Hotel Grants · Page 4 of 4
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            About Us & Location Contact
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover the history of Hotel Grants in Vila Buarque, São Paulo. Reach out directly to our team for reservations, concierge inquiries, or directions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Story & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                Our Story
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Hotel Grants — Boutique Luxury in Vila Buarque
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Founded with a commitment to refined comfort and personalized service, <strong>Hotel Grants</strong> stands as a landmark of warm hospitality in São Paulo. Located in the leafy, historic neighborhood of <strong>Vila Buarque</strong>, our hotel provides an intimate retreat away from urban noise while remaining minutes from top destinations like Avenida Paulista, Teatro Municipal, and Mercado Municipal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <span className="font-serif font-bold text-xl text-[#c59b27] block">Hospitality</span>
                <span className="text-xs font-bold text-slate-800">Genuine Brazilian Warmth</span>
                <p className="text-[11px] text-slate-500 mt-1">Multi-lingual staff attentive to your every requirement.</p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <span className="font-serif font-bold text-xl text-[#c59b27] block">Location</span>
                <span className="text-xs font-bold text-slate-800">Central & Accessible</span>
                <p className="text-[11px] text-slate-500 mt-1">Short walk to Santa Cecília & República Metro Stations.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-900">
            <img
              src={HOTEL_IMAGES.aboutBuilding}
              alt="Hotel Grants Architecture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Official Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-[#c59b27]/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#c59b27]/15 text-[#c59b27] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Hotel Address
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>{HOTEL_INFO.name}</strong><br />
              {HOTEL_INFO.address}
            </p>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-[#c59b27]/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#c59b27]/15 text-[#c59b27] flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Phone & WhatsApp
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct Desk: <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold text-slate-900 hover:underline">{HOTEL_INFO.phone}</a><br />
              WhatsApp: <a href={`${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(HOTEL_INFO.whatsappDefaultMessage)}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">+55 11 98612-0400</a>
            </p>
          </div>

          {/* Card 3: Check-in Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm hover:border-[#c59b27]/50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#c59b27]/15 text-[#c59b27] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Reception & Service
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check-In: <strong>{HOTEL_INFO.checkInTime}</strong><br />
              Check-Out: <strong>{HOTEL_INFO.checkOutTime}</strong><br />
              Front Desk: <strong>24 Hours Daily</strong>
            </p>
          </div>

        </div>

        {/* Contact Form & Google Maps Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Form */}
          <div className="lg:col-span-6 p-8 lg:p-10 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#c59b27] uppercase tracking-widest block">
                Send a Message
              </span>
              <h2 className="font-serif font-bold text-2xl text-slate-900">
                Contact Hotel Grants
              </h2>
              <p className="text-xs text-slate-500">
                Have a question regarding room availability, group bookings, or special requests?
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-xl">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you, <strong>{senderName}</strong>. Our front desk team will reply to <strong>{senderEmail}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanda Lima"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. amanda@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +55 11 98612-0400"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:border-[#c59b27] focus:outline-none"
                    >
                      <option value="General Information">General Information</option>
                      <option value="Room Reservation">Room Reservation</option>
                      <option value="Special Offers">Special Offers</option>
                      <option value="Corporate / Business Stay">Corporate / Business Stay</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can Hotel Grants assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:border-[#c59b27] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#121a20] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#c59b27]" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={`tel:${HOTEL_INFO.phone}`}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-6 bg-slate-900 min-h-[400px] relative">
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
    </div>
  );
};
