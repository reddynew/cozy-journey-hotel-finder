
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    latitude?: number;
    longitude?: number;
  };
  onBook: (hotelId: string) => void;
  onViewMap?: (hotelId: string) => void;
}

export function HotelCard({ hotel, onBook, onViewMap }: HotelCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="overflow-hidden hotel-card border border-gray-200 group">
      <div className="relative h-48 overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            !isLoading && "hidden"
          )}
        />
        <img
          src={hotel.image}
          alt={hotel.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
          {hotel.rating}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{hotel.name}</CardTitle>
            <div className="flex items-center text-gray-500 text-xs mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {hotel.location}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 text-xs line-clamp-2 h-10">{hotel.description}</p>
        <div className="mt-3">
          <p className="text-base font-bold">${hotel.price} <span className="text-xs font-normal text-gray-500">/ night</span></p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="w-full text-xs h-9 rounded-full bg-primary hover:bg-primary/90 transition-all"
          onClick={() => onBook(hotel.id)}
        >
          Book Now
        </Button>
        
        {hotel.latitude && hotel.longitude && onViewMap && (
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => onViewMap(hotel.id)}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
