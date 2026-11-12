import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Coffee, Car, Wine, Clock, CheckCircle2, MessageCircle, Send, Sparkles, AlertCircle } from 'lucide-react';
import { HOTEL_INFO, HOTEL_ROOMS, formatPrice, CURRENCY_RATES } from '../data/hotelData';
import { CurrencyCode } from '../types/hotel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoomId?: string;
  selectedOfferCode?: string;
  currency: CurrencyCode;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoomId,
  selectedOfferCode,
  currency,
}) => {
  // Dates default: tomorrow and 2 nights later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateStr(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateStr(dayAfterTomorrow));
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(selectedRoomId || HOTEL_ROOMS[0].id);
  
  // Add-ons
  const [addOns, setAddOns] = useState({
    breakfast: true,
    airportTransfer: false,
    champagne: false,
    lateCheckout: false,
  });

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Status
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedRoomId) {
      setRoomId(selectedRoomId);
    }
  }, [selectedRoomId]);

  if (!isOpen) return null;

  const currentRoom = HOTEL_ROOMS.find((r) => r.id === roomId) || HOTEL_ROOMS[0];

  // Calculate Nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const timeDiff = d2.getTime() - d1.getTime();
  const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

  // Price calculation
  const roomTotalBRL = currentRoom.priceBRL * nights;
  const breakfastTotalBRL = addOns.breakfast ? 45 * nights * guests : 0;
  const transferTotalBRL = addOns.airportTransfer ? 130 : 0;
  const champagneTotalBRL = addOns.champagne ? 180 : 0;
  const lateCheckoutTotalBRL = addOns.lateCheckout ? 90 : 0;

  const grandTotalBRL = roomTotalBRL + breakfastTotalBRL + transferTotalBRL + champagneTotalBRL + lateCheckoutTotalBRL;

  // Build WhatsApp Message
  const buildWhatsAppText = () => {
    let msg = `*RESERVATION REQUEST - HOTEL GRANTS*\n\n`;
    msg += `🏨 *Room:* ${currentRoom.name}\n`;
    msg += `📅 *Check-In:* ${checkIn}\n`;
    msg += `📅 *Check-Out:* ${checkOut} (${nights} night${nights > 1 ? 's' : ''})\n`;
    msg += `👥 *Guests:* ${guests}\n\n`;

    msg += `*Selected Add-ons:*\n`;
    if (addOns.breakfast) msg += `• Daily Gourmet Breakfast\n`;
    if (addOns.airportTransfer) msg += `• Airport Transfer Shuttle\n`;
    if (addOns.champagne) msg += `• Welcome Sparkling Wine\n`;
    if (addOns.lateCheckout) msg += `• Late Check-out (15:00)\n`;
    if (!addOns.breakfast && !addOns.airportTransfer && !addOns.champagne && !addOns.lateCheckout) {
      msg += `• Standard amenities only\n`;
    }

    if (selectedOfferCode) {
      msg += `\n🏷️ *Offer Promo Code:* ${selectedOfferCode}\n`;
    }

    msg += `\n💰 *Estimated Total:* ${formatPrice(grandTotalBRL, currency)} (${grandTotalBRL} BRL)\n\n`;

    if (guestName) msg += `👤 *Guest Name:* ${guestName}\n`;
    if (guestPhone) msg += `📞 *Phone:* ${guestPhone}\n`;
    if (guestEmail) msg += `✉️ *Email:* ${guestEmail}\n`;
    if (specialRequests) msg += `📝 *Notes:* ${specialRequests}\n`;

    msg += `\nPlease confirm availability and payment instructions. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppBooking = () => {
    const url = `${HOTEL_INFO.whatsappUrl}?text=${buildWhatsAppText()}`;
    window.open(url, '_blank');
  };

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMessage('Please provide your name and email address to complete reservation.');
      return;
    }
    setErrorMessage('');
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setBookingId(`HG-2026-${randomNum}`);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121a20] border border-slate-700 text-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#0f172a] px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#c59b27] flex items-center justify-center text-slate-950 font-bold font-serif">
              HG
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white tracking-wide">
                Book Your Stay at Hotel Grants
              </h3>
              <p className="text-xs text-slate-400">
                Instant reservation & WhatsApp direct booking engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            /* Confirmation Screen */
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#c59b27] tracking-widest uppercase block">
                  Reservation Confirmation
                </span>
                <h4 className="font-serif font-bold text-3xl text-white">
                  Reservation Received!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{guestName}</strong>. Your reservation request has been submitted to Hotel Grants reception.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#18232c] border border-slate-700 rounded-lg p-5 max-w-lg mx-auto text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400 font-semibold">Booking ID:</span>
                  <span className="text-[#c59b27] font-mono font-bold text-sm">{bookingId}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block">Room Type:</span>
                    <span className="text-slate-200 font-medium">{currentRoom.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dates:</span>
                    <span className="text-slate-200 font-medium">{checkIn} to {checkOut} ({nights} nights)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Guests:</span>
                    <span className="text-slate-200 font-medium">{guests} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Price:</span>
                    <span className="text-emerald-400 font-bold">{formatPrice(grandTotalBRL, currency)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 italic">
                  A copy of this reservation summary has been sent to <strong>{guestEmail}</strong>.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm instantly on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleOnlineSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Room & Dates */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-[#c59b27] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Calendar className="w-4 h-4 text-[#c59b27]" />
                  <span>1. Select Room & Stay Dates</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Room */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Select Room Type</label>
                    <select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#c59b27] focus:outline-none"
                    >
                      {HOTEL_ROOMS.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — {formatPrice(room.priceBRL, currency)} / night ({room.sizeM2}m²)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check In */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Check-In Date</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={formatDateStr(today)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  {/* Check Out */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Check-Out Date</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Number of Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#c59b27] focus:outline-none"
                    >
                      <option value={1}>1 Guest (Single occupancy)</option>
                      <option value={2}>2 Guests (Double occupancy)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests (Family Suite)</option>
                    </select>
                  </div>

                  {/* Nights Calculation Badge */}
                  <div className="flex items-end pb-1">
                    <div className="w-full p-2.5 bg-[#18232c] border border-slate-700 rounded text-xs flex items-center justify-between text-slate-300">
                      <span>Duration of Stay:</span>
                      <span className="font-bold text-[#c59b27] text-sm">{nights} Night(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Add-on Services */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#c59b27] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4 text-[#c59b27]" />
                  <span>2. Enhance Your Stay (Optional Add-ons)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                    addOns.breakfast ? 'bg-[#c59b27]/15 border-[#c59b27] text-white' : 'bg-[#18232c] border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOns.breakfast}
                        onChange={(e) => setAddOns({ ...addOns, breakfast: e.target.checked })}
                        className="rounded accent-[#c59b27]"
                      />
                      <Coffee className="w-4 h-4 text-[#c59b27]" />
                      <div>
                        <span className="font-semibold block">Artisanal Breakfast</span>
                        <span className="text-[10px] text-slate-400">R$ 45 / day / guest</span>
                      </div>
                    </div>
                  </label>

                  <label className={`p-3 rounded border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                    addOns.airportTransfer ? 'bg-[#c59b27]/15 border-[#c59b27] text-white' : 'bg-[#18232c] border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOns.airportTransfer}
                        onChange={(e) => setAddOns({ ...addOns, airportTransfer: e.target.checked })}
                        className="rounded accent-[#c59b27]"
                      />
                      <Car className="w-4 h-4 text-[#c59b27]" />
                      <div>
                        <span className="font-semibold block">Airport Shuttle Transfer</span>
                        <span className="text-[10px] text-slate-400">R$ 130 one-way</span>
                      </div>
                    </div>
                  </label>

                  <label className={`p-3 rounded border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                    addOns.champagne ? 'bg-[#c59b27]/15 border-[#c59b27] text-white' : 'bg-[#18232c] border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOns.champagne}
                        onChange={(e) => setAddOns({ ...addOns, champagne: e.target.checked })}
                        className="rounded accent-[#c59b27]"
                      />
                      <Wine className="w-4 h-4 text-[#c59b27]" />
                      <div>
                        <span className="font-semibold block">Chilled Welcome Wine</span>
                        <span className="text-[10px] text-slate-400">R$ 180 bottle</span>
                      </div>
                    </div>
                  </label>

                  <label className={`p-3 rounded border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                    addOns.lateCheckout ? 'bg-[#c59b27]/15 border-[#c59b27] text-white' : 'bg-[#18232c] border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addOns.lateCheckout}
                        onChange={(e) => setAddOns({ ...addOns, lateCheckout: e.target.checked })}
                        className="rounded accent-[#c59b27]"
                      />
                      <Clock className="w-4 h-4 text-[#c59b27]" />
                      <div>
                        <span className="font-semibold block">Late Check-out (15:00)</span>
                        <span className="text-[10px] text-slate-400">R$ 90 flat fee</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Guest Information */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#c59b27] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Users className="w-4 h-4 text-[#c59b27]" />
                  <span>3. Guest Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +55 11 98612-0400"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Special Requests or Flight Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. High floor requested, quiet room..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="bg-[#18232c] border border-[#c59b27]/40 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Room Base Rate ({nights} night{nights > 1 ? 's' : ''}):</span>
                  <span>{formatPrice(roomTotalBRL, currency)}</span>
                </div>
                {breakfastTotalBRL > 0 && (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Artisanal Breakfast ({guests} guests, {nights} days):</span>
                    <span>{formatPrice(breakfastTotalBRL, currency)}</span>
                  </div>
                )}
                {(transferTotalBRL + champagneTotalBRL + lateCheckoutTotalBRL) > 0 && (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Selected Extras:</span>
                    <span>{formatPrice(transferTotalBRL + champagneTotalBRL + lateCheckoutTotalBRL, currency)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-white">Total Amount:</span>
                  <span className="font-serif font-bold text-2xl text-[#c59b27]">
                    {formatPrice(grandTotalBRL, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Reserve via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] hover:to-[#b58c1c] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Online Request</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 No advance credit card charge required now. Pay directly at hotel check-in.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
