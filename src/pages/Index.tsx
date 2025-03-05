
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { HotelProvider, useHotels } from "@/contexts/HotelContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { HotelCard } from "@/components/HotelCard";

function HomeContent() {
  const { hotels, filteredHotels, setFilteredHotels, addBooking, getHotelById } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [children, setChildren] = useState(0);

  const hotel = selectedHotel ? getHotelById(selectedHotel) : null;

  const handleSearch = (searchData: {
    location: string;
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
    children: number;
  }) => {
    if (!searchData.location) {
      toast.error("Please enter a location");
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchData.location.toLowerCase())
    );
    
    if (filtered.length === 0) {
      toast.error("No hotels found for this location");
      return;
    }
    
    setFilteredHotels(filtered);
    toast.success(`Found ${filtered.length} hotels in ${searchData.location}`);
  };

  const handleBook = (hotelId: string) => {
    setSelectedHotel(hotelId);
  };

  const confirmBooking = () => {
    if (!hotel || !date) {
      toast.error("Please select a date");
      return;
    }

    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn: date,
      guests,
      children,
    });
    
    toast.success("Booking confirmed!");
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury hotel" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full pt-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover your perfect stay
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience luxury and comfort at the world's most extraordinary destinations
            </p>
          </div>

          {/* Search Bar */}
          <div className="py-8 animate-slide-in">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of extraordinary hotels and resorts from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.slice(0, 8).map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our carefully curated selection and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 neo-blur rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5a16.5 16.5 0 0 0 7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Curated Selection</h3>
              <p className="text-gray-600">
                We hand-pick every property to ensure exceptional quality and experience
              </p>
            </div>
            
            <div className="text-center p-6 neo-blur rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Find a lower price elsewhere and we'll match it, plus give you an additional discount
              </p>
            </div>
            
            <div className="text-center p-6 neo-blur rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 13V7" />
                  <path d="M15.45 15.5a2.5 2.5 0 1 0-3.45-2.29" />
                  <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our travel experts are available around the clock to assist with any questions or needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking modal */}
      <Dialog open={!!selectedHotel} onOpenChange={(open) => !open && setSelectedHotel(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Book Your Stay</DialogTitle>
          </DialogHeader>
          
          {hotel && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-24 w-24 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="font-medium">{hotel.name}</h3>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-medium">${hotel.price}</span>
                    <span className="text-xs text-gray-500 ml-1">/ night</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !date && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Input
                      id="adults"
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Price per night</span>
                    <span>${hotel.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Guests</span>
                    <span>{guests + children}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${hotel.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSelectedHotel(null)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking} disabled={!date}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Index = () => {
  return (
    <HotelProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <HomeContent />
        <Footer />
      </div>
    </HotelProvider>
  );
};

export default Index;
