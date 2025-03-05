
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Users,
} from "lucide-react";

interface SearchBarProps {
  onSearch: (data: {
    location: string;
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
    children: number;
  }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [children, setChildren] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    if (!location) {
      return;
    }
    
    onSearch({
      location,
      checkIn,
      checkOut,
      guests,
      children,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto transition-all duration-500 ease-in-out">
      <div 
        className={cn(
          "neo-blur rounded-full flex items-center justify-between p-1 mx-auto",
          "transition-all duration-300 ease-in-out hover:shadow-md",
          isExpanded ? "w-full" : "w-full md:w-3/5"
        )}
      >
        {/* Location input */}
        <div 
          className="flex-1 px-4 py-2"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Where</span>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm focus:ring-0"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* Check-in date */}
        <div className={cn(
          "relative px-4 py-2 flex-1 transition-all duration-300",
          !isExpanded && "hidden md:block"
        )}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500">Check in</span>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {checkIn ? format(checkIn, "MMM dd") : "Add date"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Divider */}
        <div className={cn(
          "h-8 w-px bg-gray-200 transition-all duration-300",
          !isExpanded && "hidden md:block"
        )}></div>

        {/* Check-out date */}
        <div className={cn(
          "relative px-4 py-2 flex-1 transition-all duration-300",
          !isExpanded && "hidden md:block"
        )}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500">Check out</span>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {checkOut ? format(checkOut, "MMM dd") : "Add date"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => 
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Divider */}
        <div className={cn(
          "h-8 w-px bg-gray-200 transition-all duration-300",
          !isExpanded && "hidden md:block"
        )}></div>

        {/* Guests */}
        <div className={cn(
          "relative px-4 py-2 flex-1 transition-all duration-300",
          !isExpanded && "hidden md:block"
        )}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto w-full justify-start hover:bg-transparent focus:bg-transparent">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-500">Guests</span>
                  <div className="flex items-center">
                    <Users className="mr-2 h-3 w-3 opacity-70" />
                    <span className="text-sm truncate">
                      {guests + children} {guests + children === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Adults</p>
                    <p className="text-xs text-gray-500">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      <span>-</span>
                    </Button>
                    <span className="w-4 text-center">{guests}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => setGuests(guests + 1)}
                    >
                      <span>+</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Children</p>
                    <p className="text-xs text-gray-500">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      <span>-</span>
                    </Button>
                    <span className="w-4 text-center">{children}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => setChildren(children + 1)}
                    >
                      <span>+</span>
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search button */}
        <Button 
          className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 shrink-0 transition-transform duration-300 ease-in-out transform active:scale-95"
          onClick={handleSearchClick}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
