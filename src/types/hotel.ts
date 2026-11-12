export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rateToBRL: number; // 1 BRL = rate
  label: string;
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  category: 'room' | 'hotel' | 'dining';
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  fullDescription: string;
  priceBRL: number; // Price per night in BRL
  sizeM2: number;
  capacityGuests: number;
  bedType: string;
  view: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  features: string[];
  featured?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  badge: string;
  description: string;
  priceBRL: number;
  originalPriceBRL?: number;
  discountPercent?: number;
  minNights: number;
  includedFeatures: string[];
  image: string;
  bookingConditions: string;
  featured?: boolean;
  code: string;
}

export interface GuestReview {
  id: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  source: 'Google' | 'Trustpilot' | 'Verified Booking';
  avatar?: string;
  roomType?: string;
  verified?: boolean;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  offerCode?: string;
  addOns: {
    breakfast: boolean; // +R$ 45/day/guest
    airportTransfer: boolean; // +R$ 130
    champagne: boolean; // +R$ 180
    lateCheckout: boolean; // +R$ 90
  };
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface HotelFAQ {
  question: string;
  answer: string;
  category: 'booking' | 'offers' | 'amenities' | 'location';
}
