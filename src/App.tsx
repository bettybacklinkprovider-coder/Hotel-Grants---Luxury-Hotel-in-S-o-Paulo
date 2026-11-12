import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { ReviewModal } from './components/ReviewModal';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { OffersPage } from './pages/OffersPage';
import { AboutContactPage } from './pages/AboutContactPage';

import { CurrencyCode } from './types/hotel';
import { HOTEL_ROOMS } from './data/hotelData';

export default function App() {
  // Page state: 'home' | 'rooms' | 'offers' | 'about'
  const [currentPage, setCurrentPage] = useState<'home' | 'rooms' | 'offers' | 'about'>('home');
  
  // Currency state
  const [currency, setCurrency] = useState<CurrencyCode>('BRL');

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined);
  const [bookingOfferCode, setBookingOfferCode] = useState<string | undefined>(undefined);

  const [roomDetailModalOpen, setRoomDetailModalOpen] = useState(false);
  const [selectedRoomIdForDetail, setSelectedRoomIdForDetail] = useState<string | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'rooms') setCurrentPage('rooms');
      else if (hash === 'offers') setCurrentPage('offers');
      else if (hash === 'about' || hash === 'contact') setCurrentPage('about');
      else setCurrentPage('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'rooms' | 'offers' | 'about') => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (roomId?: string, offerCode?: string) => {
    setBookingRoomId(roomId);
    setBookingOfferCode(offerCode);
    setBookingModalOpen(true);
  };

  const handleOpenRoomDetails = (roomId: string) => {
    setSelectedRoomIdForDetail(roomId);
    setRoomDetailModalOpen(true);
  };

  const selectedRoomDetailObj = HOTEL_ROOMS.find((r) => r.id === selectedRoomIdForDetail) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c2226] font-sans antialiased selection:bg-[#c59b27] selection:text-white">
      
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            currency={currency}
            onOpenBooking={handleOpenBooking}
            onSelectRoomDetails={handleOpenRoomDetails}
            onOpenReviewModal={() => setReviewModalOpen(true)}
          />
        )}

        {currentPage === 'rooms' && (
          <RoomsPage
            currency={currency}
            onOpenBooking={handleOpenBooking}
            onSelectRoomDetails={handleOpenRoomDetails}
          />
        )}

        {currentPage === 'offers' && (
          <OffersPage
            currency={currency}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'about' && (
          <AboutContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenReviewModal={() => setReviewModalOpen(true)}
      />

      {/* Global Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Booking Drawer Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedRoomId={bookingRoomId}
        selectedOfferCode={bookingOfferCode}
        currency={currency}
      />

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoomDetailObj}
        isOpen={roomDetailModalOpen}
        onClose={() => setRoomDetailModalOpen(false)}
        currency={currency}
        onBookRoom={(roomId) => handleOpenBooking(roomId)}
      />

      {/* Review & QR Code Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />

    </div>
  );
}
