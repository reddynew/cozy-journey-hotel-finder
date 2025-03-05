
import { createContext, useContext, useState, ReactNode } from "react";

// Sample hotel data
const hotelData = [
  {
    id: "1",
    name: "The Ethereal Resort",
    location: "Paris, France",
    description: "Experience luxury in the heart of Paris with breathtaking views of the Eiffel Tower.",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: "2",
    name: "Seaside Serenity Lodge",
    location: "Santorini, Greece",
    description: "Perched on the cliffs of Santorini, our lodge offers unparalleled views of the Aegean Sea.",
    price: 420,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    latitude: 36.3932,
    longitude: 25.4615,
  },
  {
    id: "3",
    name: "Metropolitan Boutique Hotel",
    location: "New York, USA",
    description: "A stylish retreat in the bustling heart of Manhattan, steps away from Central Park.",
    price: 280,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000&auto=format&fit=crop",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: "4",
    name: "Alpine Tranquility Resort",
    location: "Zurich, Switzerland",
    description: "Nestled in the Swiss Alps, offering panoramic mountain views and world-class amenities.",
    price: 390,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop",
    latitude: 47.3769,
    longitude: 8.5417,
  },
  {
    id: "5",
    name: "Tropical Paradise Villa",
    location: "Bali, Indonesia",
    description: "Private villas surrounded by lush tropical gardens and pristine beaches.",
    price: 320,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
    latitude: -8.4095,
    longitude: 115.1889,
  },
  {
    id: "6",
    name: "Historic City Majestic",
    location: "Rome, Italy",
    description: "Stay in a refurbished historical palace with modern amenities near the Colosseum.",
    price: 370,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop",
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    id: "7",
    name: "Cherry Blossom Inn",
    location: "Kyoto, Japan",
    description: "Traditional Japanese ryokan with beautiful gardens and authentic cuisine.",
    price: 290,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=1000&auto=format&fit=crop",
    latitude: 35.0116,
    longitude: 135.7681,
  },
  {
    id: "8",
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    description: "Luxury in the desert with private pools and stunning sunset views over the dunes.",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1550531996-ff3dcede9477?q=80&w=1000&auto=format&fit=crop",
    latitude: 25.2048,
    longitude: 55.2708,
  }
];

// Booking type
interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
  children?: number;
  totalPrice: number;
}

// Context type
interface HotelContextType {
  hotels: typeof hotelData;
  filteredHotels: typeof hotelData;
  bookings: Booking[];
  setFilteredHotels: (hotels: typeof hotelData) => void;
  addBooking: (booking: Omit<Booking, "id" | "totalPrice">) => void;
  getHotelById: (id: string) => (typeof hotelData)[0] | undefined;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export function HotelProvider({ children }: { children: ReactNode }) {
  const [hotels] = useState(hotelData);
  const [filteredHotels, setFilteredHotels] = useState(hotelData);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, "id" | "totalPrice">) => {
    const hotel = hotels.find(h => h.id === bookingData.hotelId);
    
    if (!hotel) return;
    
    const checkInDate = bookingData.checkIn || new Date();
    const checkOutDate = bookingData.checkOut || new Date(checkInDate.getTime() + 86400000);
    
    // Calculate days between check-in and check-out
    const days = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 11),
      ...bookingData,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice: hotel.price * days
    };
    
    setBookings(prev => [...prev, newBooking]);
  };

  const getHotelById = (id: string) => {
    return hotels.find(hotel => hotel.id === id);
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        filteredHotels,
        bookings,
        setFilteredHotels,
        addBooking,
        getHotelById,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotels must be used within a HotelProvider");
  }
  return context;
}
