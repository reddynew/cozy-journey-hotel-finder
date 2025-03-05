
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-white py-12 px-6">
      <div className="container mx-auto grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Serenity</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Beautifully designed hotel booking experience with focus on simplicity and elegance.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/press" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Press
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm text-gray-500 hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/cancellation" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Cancellation Options
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Cookies
              </Link>
            </li>
            <li>
              <Link to="/licenses" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Licenses
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Serenity. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
