
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out",
        scrolled 
          ? "glass-morphism py-3" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight text-primary">Serenity</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/hotels" className="text-sm font-medium transition-colors hover:text-primary">
            Hotels
          </Link>
          <Link to="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
            Destinations
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-primary text-white shadow hover:bg-primary/90"
          >
            Sign In
          </Link>
          
          <button className="md:hidden flex items-center justify-center rounded-md w-8 h-8">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
