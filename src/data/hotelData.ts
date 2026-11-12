import { CurrencyRate, GuestReview, HotelFAQ, Room, SpecialOffer } from '../types/hotel';

// Hotel Basic Details
export const HOTEL_INFO = {
  name: 'Hotel Grants',
  tagline: 'Experience Comfort, Elegance & Exceptional Hospitality in São Paulo',
  phone: '+55 11 98612-0400',
  whatsappNumber: '5511986120400',
  whatsappUrl: 'https://wa.me/5511986120400',
  whatsappDefaultMessage: 'Hello Hotel Grants, I would like to know more about room availability, prices, and booking options.',
  address: 'R. Amaral Gurgel, 380 - Vila Buarque, São Paulo - SP, 01221-000, Brazil',
  email: 'reservas@hotelgrants.com.br',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4877239243765!2d-46.64964682379899!3d-23.54190876120473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce58448fa560cb%3A0x8dd3f289387ca479!2sR.%20Amaral%20Gurgel%2C%20380%20-%20Vila%20Buarque%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001221-000%2C%20Brazil!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJy2CFjkRYzpQReaR8OIne048',
  checkInTime: '14:00 (2:00 PM)',
  checkOutTime: '12:00 (12:00 PM)',
  rating: 4.9,
  totalReviews: 348,
  starBreakdown: [
    { stars: 5, percentage: 88, count: 306 },
    { stars: 4, percentage: 9, count: 31 },
    { stars: 3, percentage: 2, count: 7 },
    { stars: 2, percentage: 1, count: 3 },
    { stars: 1, percentage: 0, count: 1 },
  ],
};

// Currencies
export const CURRENCY_RATES: Record<string, CurrencyRate> = {
  BRL: { code: 'BRL', symbol: 'R$', rateToBRL: 1, label: 'BRL (R$)' },
  USD: { code: 'USD', symbol: '$', rateToBRL: 0.18, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rateToBRL: 0.16, label: 'EUR (€)' },
};

export function formatPrice(priceBRL: number, currency: string = 'BRL'): string {
  const rate = CURRENCY_RATES[currency] || CURRENCY_RATES.BRL;
  const converted = priceBRL * rate.rateToBRL;
  return `${rate.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Generated Images references
import heroImg from '../assets/images/hotel_grants_hero_1794470286018.jpg';
import suiteImg from '../assets/images/hotel_grants_suite_1794470286833.jpg';
import diningImg from '../assets/images/hotel_grants_dining_1794470287139.jpg';
import romanticImg from '../assets/images/hotel_grants_romantic_1794470286934.jpg';
import lobbyImg from '../assets/images/hotel_grants_lobby_1794470287634.jpg';
import facWifiImg from '../assets/images/hotel_grants_fac_wifi_1794472493819.jpg';
import facParkingImg from '../assets/images/hotel_grants_fac_parking_1794472495089.jpg';
import facLoungeImg from '../assets/images/hotel_grants_fac_lounge_1794472495073.jpg';
import aboutBuildingImg from '../assets/images/hotel_grants_about_building_1794472494710.jpg';

export const HOTEL_IMAGES = {
  hero: heroImg,
  suite: suiteImg,
  dining: diningImg,
  romantic: romanticImg,
  lobby: lobbyImg,
  facWifi: facWifiImg,
  facParking: facParkingImg,
  facLounge: facLoungeImg,
  aboutBuilding: aboutBuildingImg,
};

// Hotel Rooms
export const HOTEL_ROOMS: Room[] = [
  {
    id: 'deluxe-executive-suite',
    name: 'Deluxe Executive Suite',
    slug: 'deluxe-executive-suite',
    tagline: 'Refined sanctuary with ergonomic workspace & skyline vistas',
    description: 'Designed for discerning business travelers and couples seeking elevated comfort. Features a Plush King bed, private work desk, and luxury marble bathroom.',
    fullDescription: 'The Deluxe Executive Suite at Hotel Grants seamlessly blends classic Brazilian elegance with contemporary luxury. Spanning 35m², this quiet retreat boasts soundproofed acoustic windows, fine Egyptian cotton bedding, a dedicated ergonomic executive desk with high-speed fiber internet, and an ensuite marble bathroom equipped with a walk-in rainfall shower and Brazilian organic toiletries.',
    priceBRL: 380,
    sizeM2: 35,
    capacityGuests: 2,
    bedType: '1 King Size Bed',
    view: 'Vila Buarque City View',
    heroImage: suiteImg,
    gallery: [suiteImg, lobbyImg, diningImg, facWifiImg],
    featured: true,
    amenities: [
      'Complimentary High-Speed Wi-Fi 6',
      'Air Conditioning & Heating',
      '55" Smart TV with Streaming',
      'Nespresso Espresso Machine',
      'Marble Bathroom & Rain Shower',
      'In-Room Digital Safe',
      'Mini Bar & Complimentary Water',
      'Soundproof Windows',
      '24-Hour Room Service'
    ],
    features: ['35 m² Space', 'Max 2 Guests', 'City Skyline View', 'Work Desk']
  },
  {
    id: 'grand-master-suite',
    name: 'Grand Master Suite',
    slug: 'grand-master-suite',
    tagline: 'Ultimate luxury with private balcony & deep whirlpool tub',
    description: 'Our premier accommodations featuring an expansive layout, private sunset terrace balcony, plush seating lounge, and hydro spa bathtub.',
    fullDescription: 'Experience the pinnacle of luxury hospitality at Hotel Grants. The Grand Master Suite covers 55m² of opulent space, featuring a Super King bed with premium goose-down pillows, an adjoining lounge area with designer Italian velvet furniture, a private furnished balcony, and an exquisite spa bathroom with a Jacuzzi hydro tub, plush bathrobes, and imported amenities.',
    priceBRL: 680,
    sizeM2: 55,
    capacityGuests: 3,
    bedType: '1 Super King Bed + Daybed',
    view: 'Panoramic São Paulo Skyline',
    heroImage: romanticImg,
    gallery: [romanticImg, suiteImg, lobbyImg, facLoungeImg],
    featured: true,
    amenities: [
      'Private Terrace Balcony',
      'Jacuzzi Hydro Spa Tub',
      'Welcome Bottle of Sparkling Wine',
      'Complimentary Breakfast in Bed',
      '65" OLED 4K Smart TV',
      'Pillow Menu Selection',
      'Plush Bathrobes & Slippers',
      'Nespresso Machine & Gourmet Teas',
      'Nuki Smart Keyless Entry'
    ],
    features: ['55 m² Space', 'Max 3 Guests', 'Private Balcony', 'Jacuzzi Spa']
  },
  {
    id: 'romantic-haven-suite',
    name: 'Romantic Haven Suite',
    slug: 'romantic-haven-suite',
    tagline: 'Intimate ambiance tailored for couples, anniversaries & honeymoons',
    description: 'A romantic haven crafted with warm ambient lighting, plush velvet seating, welcome rose petals, and panoramic city views.',
    fullDescription: 'Curated specifically for romantic getaways, celebrations, and memorable couples retreats. The Romantic Haven Suite embraces an intimate atmosphere with dimmable ambient mood lighting, a King bed wrapped in 600-thread-count sheets, a deep soaking tub, and a complimentary welcome bottle of Brazilian sparkling wine upon arrival.',
    priceBRL: 540,
    sizeM2: 42,
    capacityGuests: 2,
    bedType: '1 Plush King Bed',
    view: 'Private Courtyard / City Lights',
    heroImage: romanticImg,
    gallery: [romanticImg, suiteImg, diningImg, facLoungeImg],
    featured: true,
    amenities: [
      'Chilled Moët Champagne Service',
      'Romantic Floral Decoration',
      'Deep Soaking Bathtub',
      'Late Check-out until 15:00',
      'Bose Bluetooth Sound System',
      'Daily Gourmet Breakfast',
      'Blackout Motorized Blinds',
      'Luxury Spa Toiletries'
    ],
    features: ['42 m² Space', 'Max 2 Guests', 'Romantic Decor', 'Late Check-out']
  },
  {
    id: 'family-duplex-residence',
    name: 'Family Duplex Residence',
    slug: 'family-duplex-residence',
    tagline: 'Spacious multi-bedroom suite perfect for families & groups',
    description: 'Generous duplex layout with two queen beds, dining area, kitchenette, and interactive family entertainment hub.',
    fullDescription: 'Designed for family comfort in central São Paulo. The Family Duplex Residence features two separate sleeping quarters, a spacious living area, a mini kitchenette with microwave and mini-fridge, two private full bathrooms, and child-safe window locks. Offers privacy for parents and room to play for children.',
    priceBRL: 750,
    sizeM2: 65,
    capacityGuests: 5,
    bedType: '2 Queen Beds + 1 Sofa Bed',
    view: 'Vila Buarque Gardens',
    heroImage: lobbyImg,
    gallery: [lobbyImg, suiteImg, diningImg, aboutBuildingImg],
    featured: false,
    amenities: [
      'Two Separate Full Bathrooms',
      'Kitchenette & Microwave',
      'Dining Table for 4',
      'Kids Welcome Gift Pack',
      'Two 50" Smart TVs',
      'Connecting Room Option',
      'High Chair & Baby Cot Available',
      'Daily Housekeeping'
    ],
    features: ['65 m² Space', 'Max 5 Guests', 'Kitchenette', '2 Full Baths']
  },
  {
    id: 'standard-comfort-room',
    name: 'Standard Comfort Room',
    slug: 'standard-comfort-room',
    tagline: 'Uncompromising quality and modern essential comfort',
    description: 'A cozy, impeccably appointed room featuring a Queen bed, walk-in shower, fast Wi-Fi, and modern aesthetic accents.',
    fullDescription: 'Ideal for short stays, leisure weekenders, or business travelers who demand hotel quality at an attractive rate. Standard Comfort Rooms feature 28m² of smart layout design, a high-density orthopedic Queen mattress, silent climate control, laptop-sized safe, and walk-in glass shower.',
    priceBRL: 290,
    sizeM2: 28,
    capacityGuests: 2,
    bedType: '1 Queen Bed',
    view: 'City Quiet Side',
    heroImage: suiteImg,
    gallery: [suiteImg, diningImg, facWifiImg],
    featured: false,
    amenities: [
      'High-Speed Wi-Fi 6',
      '43" Full HD Smart TV',
      'Work Desk & USB Ports',
      'Walk-In Rainfall Shower',
      'Silent Air Conditioner',
      'Electronic Safe Box',
      'Hairdryer & Towels',
      'Daily Room Sanitization'
    ],
    features: ['28 m² Space', 'Max 2 Guests', 'Queen Bed', 'Fast Wi-Fi']
  }
];

// Special Offers & Packages
export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'weekend-getaway',
    title: 'Weekend Getaway Package',
    badge: 'Popular Choice',
    code: 'WEEKEND15',
    description: 'Escape into luxury this weekend. Includes 15% discount on 2-night weekend stays, daily artisanal breakfast buffet, and welcome Brazilian caipirinha cocktails.',
    priceBRL: 646,
    originalPriceBRL: 760,
    discountPercent: 15,
    minNights: 2,
    includedFeatures: [
      '15% Off Total Stay',
      'Daily Gourmet Breakfast Buffet',
      'Welcome Drink on Arrival',
      'Complimentary Valet Parking',
      'Late Check-out at 14:00'
    ],
    image: heroImg,
    bookingConditions: 'Valid for Friday to Sunday arrivals. Minimum 2 nights stay.',
    featured: true
  },
  {
    id: 'extended-stay-package',
    title: 'Extended Stay Luxury Package',
    badge: 'Best Value - 25% OFF',
    code: 'EXTENDED25',
    description: 'Stay 5 nights or more and enjoy 25% off room rates, complimentary express laundry service, and executive lounge access.',
    priceBRL: 1425,
    originalPriceBRL: 1900,
    discountPercent: 25,
    minNights: 5,
    includedFeatures: [
      '25% Discount on 5+ Nights',
      'Complimentary Laundry (5 items/day)',
      'Daily High-Speed Internet',
      'Executive Lounge Access with Snacks',
      'Flexible Cancellation Policy'
    ],
    image: facWifiImg,
    bookingConditions: 'Requires minimum stay of 5 consecutive nights.',
    featured: true
  },
  {
    id: 'romantic-stay-package',
    title: 'Romantic Stay & Champagne Package',
    badge: 'Honeymoon Special',
    code: 'ROMANCE2026',
    description: 'Celebrate love in style with chilled Brazilian sparkling wine, organic chocolates, rose petal room decor, breakfast served in bed, and 15:00 late check-out.',
    priceBRL: 890,
    originalPriceBRL: 1080,
    discountPercent: 18,
    minNights: 1,
    includedFeatures: [
      'Chilled Sparkling Wine in Room',
      'Artisanal Chocolate Truffles',
      'Rose Petal Decor Arrangement',
      'Gourmet Breakfast Served in Bed',
      'Guaranteed Late Check-out (15:00)'
    ],
    image: romanticImg,
    bookingConditions: 'Available all year round. Advance booking recommended.',
    featured: true
  },
  {
    id: 'family-stay-package',
    title: 'Family Comfort & Exploration Package',
    badge: 'Family Favorite',
    code: 'FAMILYFUN',
    description: 'A hassle-free family vacation in São Paulo. Children under 10 stay and eat breakfast free. Includes tickets or guide to nearby attractions.',
    priceBRL: 1120,
    originalPriceBRL: 1350,
    discountPercent: 17,
    minNights: 2,
    includedFeatures: [
      'Kids Stay & Eat Free (up to 2 kids)',
      'Spacious Duplex Suite Allocation',
      'Family Welcome Amenity Kit',
      'São Paulo Culture & Map Guide',
      'Early Check-in at 12:00'
    ],
    image: aboutBuildingImg,
    bookingConditions: 'Valid for up to 2 adults and 2 children under 10 years old.',
    featured: false
  },
  {
    id: 'business-stay-package',
    title: 'Business & Executive Mobility Package',
    badge: 'Executive Direct',
    code: 'BIZSP2026',
    description: 'Tailored for corporate travelers. Includes high-floor quiet suite guarantee, express shirt ironing, daily newspaper, and fast invoice checkout.',
    priceBRL: 490,
    originalPriceBRL: 580,
    discountPercent: 15,
    minNights: 1,
    includedFeatures: [
      'Quiet High-Floor Suite Guarantee',
      'Free Express Shirt Ironing (2 pieces)',
      'Unlimited Fiber Wi-Fi 6 Dedicated Line',
      'Early Breakfast Box for Early Flights',
      'Corporate Tax Invoice Directing'
    ],
    image: facLoungeImg,
    bookingConditions: 'Valid for corporate bookings or midweek stays (Mon - Thu).',
    featured: false
  }
];

// Guest Testimonials & Reviews
export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Mariana Silva',
    location: 'Rio de Janeiro, Brazil',
    rating: 5,
    date: 'October 28, 2026',
    comment: 'Exceptional experience at Hotel Grants! The location in Vila Buarque is safe, quiet, and charming. Staff greeted us warmly and the breakfast in the morning was incredible with fresh tropical fruit and warm pão de queijo.',
    source: 'Google',
    roomType: 'Deluxe Executive Suite',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Carlos Alberto & Luciana',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    date: 'September 14, 2026',
    comment: 'We booked the Romantic Stay Package for our anniversary. The champagne on ice and rose petals were a lovely surprise. The bed was extremely comfortable, and WhatsApp booking was fast and smooth!',
    source: 'Verified Booking',
    roomType: 'Romantic Haven Suite',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'David K. Miller',
    location: 'Chicago, USA',
    rating: 5,
    date: 'August 02, 2026',
    comment: 'Top tier hotel in central São Paulo! As an international business traveler, fast Wi-Fi and soundproof rooms are essential. Hotel Grants delivered on every promise. Will stay here again on my next Brazil trip.',
    source: 'Trustpilot',
    roomType: 'Grand Master Suite',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Fernanda Rocha',
    location: 'Belo Horizonte, Brazil',
    rating: 5,
    date: 'November 01, 2026',
    comment: 'Hotel impecável! Atendimento nota 10 na recepção e a localização é perfeita, perto de restaurantes excelentes em Vila Buarque. Quarto limpo, moderno e muito cheiroso.',
    source: 'Google',
    roomType: 'Standard Comfort Room',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Jean-Pierre Dubois',
    location: 'Paris, France',
    rating: 5,
    date: 'July 19, 2026',
    comment: 'A wonderful boutique hotel stay in Brazil. Elegant decoration, fantastic espresso coffee, and extremely helpful concierge staff who arranged our airport shuttle seamlessly.',
    source: 'Verified Booking',
    roomType: 'Deluxe Executive Suite',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Patricia & Family',
    location: 'Curitiba, Brazil',
    rating: 5,
    date: 'June 05, 2026',
    comment: 'Viajamos em família para São Paulo e o Family Duplex Residence foi super espaçoso. As crianças adoraram e o atendimento do hotel superou todas as nossas expectativas!',
    source: 'Google',
    roomType: 'Family Duplex Residence',
    verified: true
  }
];

// FAQs
export const HOTEL_FAQS: HotelFAQ[] = [
  {
    question: 'What are the check-in and check-out times at Hotel Grants?',
    answer: 'Standard check-in is from 14:00 (2:00 PM) onwards, and check-out is until 12:00 (12:00 PM). Early check-in and late check-out options can be requested during booking or through our WhatsApp team.',
    category: 'booking'
  },
  {
    question: 'How do I book via WhatsApp?',
    answer: 'Simply click any "Book on WhatsApp" button or contact +55 11 98612-0400 directly. Our reservation team will confirm room availability, pricing, and instant booking confirmation within minutes.',
    category: 'booking'
  },
  {
    question: 'Is breakfast included in the room rate?',
    answer: 'Yes! All direct bookings on our website include our full gourmet Brazilian breakfast buffet featuring tropical fruits, fresh pastries, eggs cooked to order, artisanal cheeses, and espresso coffee.',
    category: 'amenities'
  },
  {
    question: 'Is parking available at Hotel Grants?',
    answer: 'Yes, we provide secure 24/7 covered valet parking on-site at R. Amaral Gurgel, 380, Vila Buarque.',
    category: 'amenities'
  },
  {
    question: 'Where is Hotel Grants located in São Paulo?',
    answer: 'Hotel Grants is located in the vibrant Vila Buarque neighborhood (R. Amaral Gurgel, 380), close to Santa Cecília and República Metro stations, Avenida Paulista, Teatro Municipal, and top gastronomy hubs.',
    category: 'location'
  },
  {
    question: 'What is the cancellation policy for special offers?',
    answer: 'Most standard and special offer rates enjoy flexible free cancellation up to 48 hours prior to arrival date.',
    category: 'offers'
  }
];

// Facilities List with Images
export const HOTEL_FACILITIES = [
  {
    title: 'High-Speed Wi-Fi 6 Workspace',
    description: 'Complimentary fiber optic wireless internet across all guest rooms, executive lounge, and public areas.',
    icon: 'Wifi',
    image: facWifiImg
  },
  {
    title: 'Gourmet Breakfast & Restaurant',
    description: 'Daily buffet showcasing tropical fruits, freshly baked bread, tapioca, and barista coffee.',
    icon: 'Utensils',
    image: diningImg
  },
  {
    title: '24/7 Reception & Concierge',
    description: 'Multi-lingual front desk staff available around the clock for check-in, city tips, and taxi calls.',
    icon: 'Clock',
    image: lobbyImg
  },
  {
    title: 'Valet Parking & Airport Shuttle',
    description: 'On-site covered garage with valet service and private transfer arrangements upon request.',
    icon: 'Car',
    image: facParkingImg
  },
  {
    title: 'Air Conditioning & Climate Control',
    description: 'Individual silent climate control in every room with hypoallergenic air filtration.',
    icon: 'Wind',
    image: suiteImg
  },
  {
    title: 'Bar & Executive Cocktail Lounge',
    description: 'Unwind with craft Brazilian caipirinhas, fine wines, and light bites in our lobby lounge.',
    icon: 'Wine',
    image: facLoungeImg
  },
  {
    title: 'Daily Housekeeping & Express Laundry',
    description: 'Meticulous daily room cleaning, fresh linen changes, and same-day express laundry service.',
    icon: 'Sparkles',
    image: romanticImg
  },
  {
    title: 'Luggage Storage & Digital Security',
    description: 'Secure luggage lockup, CCTV monitoring, and digital in-room electronic safes.',
    icon: 'ShieldCheck',
    image: aboutBuildingImg
  }
];
