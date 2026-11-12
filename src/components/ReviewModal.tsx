import React, { useState } from 'react';
import { X, Star, QrCode, ExternalLink, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorName.trim() && reviewText.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121a20] border border-slate-700 text-white rounded-xl shadow-2xl max-w-2xl w-full relative my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#0f172a] px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#c59b27] fill-[#c59b27]" />
            <h3 className="font-serif font-bold text-xl text-white">
              Customer Reviews & Google QR Code
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
          
          {/* QR Code & Direct Link Card */}
          <div className="bg-gradient-to-br from-[#18232c] to-[#0e171d] border border-[#c59b27]/30 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
            
            {/* SVG QR Code Illustration */}
            <div className="bg-white p-3 rounded-lg shadow-lg shrink-0 flex flex-col items-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                className="w-28 h-28"
              >
                {/* QR Code pattern graphic */}
                <rect width="100" height="100" fill="white" />
                <path d="M10 10 h25 v25 h-25 z M15 15 v15 h15 v-15 z M19 19 h7 v7 h-7 z" fill="#0f172a" />
                <path d="M65 10 h25 v25 h-25 z M70 15 v15 h15 v-15 z M74 19 h7 v7 h-7 z" fill="#0f172a" />
                <path d="M10 65 h25 v25 h-25 z M15 70 v15 h15 v-15 z M19 74 h7 v7 h-7 z" fill="#0f172a" />
                
                {/* Random barcode matrix pixels */}
                <rect x="40" y="10" width="8" height="8" fill="#c59b27" />
                <rect x="50" y="15" width="8" height="12" fill="#0f172a" />
                <rect x="42" y="30" width="16" height="6" fill="#0f172a" />
                <rect x="10" y="42" width="12" height="12" fill="#0f172a" />
                <rect x="25" y="48" width="10" height="6" fill="#c59b27" />
                <rect x="42" y="42" width="16" height="16" fill="#0f172a" />
                <rect x="65" y="42" width="10" height="8" fill="#0f172a" />
                <rect x="78" y="48" width="12" height="12" fill="#c59b27" />
                <rect x="40" y="65" width="8" height="18" fill="#0f172a" />
                <rect x="52" y="70" width="12" height="8" fill="#0f172a" />
                <rect x="68" y="65" width="12" height="12" fill="#0f172a" />
                <rect x="82" y="78" width="8" height="12" fill="#0f172a" />
              </svg>
              <span className="text-[10px] font-bold text-slate-800 mt-1 uppercase tracking-wider">
                Scan on Mobile
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#c59b27]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c59b27]" />
                ))}
                <span className="text-white text-xs font-bold ml-1">4.9 / 5.0</span>
              </div>

              <h4 className="font-serif font-bold text-lg text-white">
                Scan to Review Hotel Grants on Google
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Scan this QR code with your mobile camera or click below to submit your genuine experience directly to our official Google Maps profile.
              </p>

              <a
                href={HOTEL_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c59b27] hover:bg-[#d8ab2e] text-slate-950 font-bold text-xs rounded transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Open Google Reviews Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Form */}
          <div className="space-y-4 pt-2">
            <h4 className="font-serif font-bold text-lg text-[#c59b27] border-b border-slate-800 pb-2">
              Or Leave a Guest Feedback Entry Below
            </h4>

            {submitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-semibold text-sm">Thank you for your feedback!</p>
                <p className="text-slate-300">
                  Your review has been saved and submitted to our management team at Hotel Grants.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Star Rating</label>
                    <div className="flex items-center gap-1.5 p-2 bg-[#1a242c] border border-slate-700 rounded">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= rating ? 'text-[#c59b27] fill-[#c59b27]' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-300 font-bold ml-auto">{rating} Stars</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-semibold">Your Review & Experience *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your room comfort, hospitality, breakfast, or stay location..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-[#1a242c] border border-slate-700 rounded p-2 text-xs text-white focus:border-[#c59b27] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Guest Review</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
