import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Globe, Calendar, Menu, X, ChevronDown, Award } from 'lucide-react';
import { HOTEL_INFO, CURRENCY_RATES } from '../data/hotelData';
import { CurrencyCode } from '../types/hotel';

interface HeaderProps {
  currentPage: 'home' | 'rooms' | 'offers' | 'about';
  onNavigate: (page: 'home' | 'rooms' | 'offers' | 'about') => void;
  currency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'rooms' | 'offers' | 'about') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#0f172a] text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-[#c59b27]" />
              Luxury Boutique Stay in São Paulo
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">R. Amaral Gurgel, 380 - Vila Buarque</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#c59b27] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="font-medium">{HOTEL_INFO.phone}</span>
            </a>
            <a
              href={`${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(HOTEL_INFO.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#121a20]/95 backdrop-blur-md shadow-xl border-b border-slate-800 text-white' 
          : 'bg-[#121a20] text-white border-b border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#c59b27] to-[#8a6b16] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              HG
            </div>
            <div>
              <span className="font-serif font-bold text-2xl tracking-wide text-white block leading-tight">
                HOTEL GRANTS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#c59b27] uppercase font-medium block">
                SÃO PAULO · BRASIL
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (4 separate pages) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-[#c59b27] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('rooms')}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                currentPage === 'rooms'
                  ? 'text-[#c59b27] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rooms & Accommodation
              {currentPage === 'rooms' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('offers')}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                currentPage === 'offers'
                  ? 'text-[#c59b27] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Special Offers & Packages
              {currentPage === 'offers' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b27] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                currentPage === 'about'
                  ? 'text-[#c59b27] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              About Us & Contact
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b27] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Currency Switcher + Book Button) */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white hover:border-[#c59b27] transition-colors"
                title="Change Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>{CURRENCY_RATES[currency].code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#1a232a] border border-slate-700 rounded shadow-2xl py-1 z-50">
                  {Object.values(CURRENCY_RATES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        currency === c.code ? 'text-[#c59b27] font-bold bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span>{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Your Stay CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-[#c59b27] to-[#a37d18] hover:from-[#d8ab2e] hover:to-[#b58c1c] text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161f26] border-b border-slate-800 text-white px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 px-3 rounded text-base font-medium transition-colors ${
                currentPage === 'home' ? 'bg-[#c59b27]/20 text-[#c59b27] font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              1. Home Page
            </button>
            <button
              onClick={() => handleNavClick('rooms')}
              className={`text-left py-2 px-3 rounded text-base font-medium transition-colors ${
                currentPage === 'rooms' ? 'bg-[#c59b27]/20 text-[#c59b27] font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              2. Rooms & Accommodation
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className={`text-left py-2 px-3 rounded text-base font-medium transition-colors ${
                currentPage === 'offers' ? 'bg-[#c59b27]/20 text-[#c59b27] font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              3. Special Offers & Packages
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 px-3 rounded text-base font-medium transition-colors ${
                currentPage === 'about' ? 'bg-[#c59b27]/20 text-[#c59b27] font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              4. About Us & Contact
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded bg-gradient-to-r from-[#c59b27] to-[#a37d18] text-slate-950 font-bold text-sm tracking-wider uppercase shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay Now</span>
            </button>

            <a
              href={`${HOTEL_INFO.whatsappUrl}?text=${encodeURIComponent(HOTEL_INFO.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Reservation (+55 11 98612-0400)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
