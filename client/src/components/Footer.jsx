import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

// Custom Brand Icons since Lucide v1.0+ removed them
const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 68.4 68.4 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 68.4 68.4 0 0 1-15 0 2 2 0 0 1-2-2Z" /><path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

const PinterestIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22c.5-3 1-6 1.5-9" />
    <path d="M12.707 14.293c-1.5-1.5-2-4-1.5-6 .5-2.5 3-4.5 5.5-4s4 3 4 5.5c0 3-2 6-5 6-1.5 0-3-1-3-2.5" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-dark-text text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Info */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-bold font-serif tracking-widest text-gold">
            SHAADI<span className="text-white">HUB</span>
          </Link>
          <p className="text-gray-400 leading-relaxed">
            India's most trusted wedding planning platform. We help you find the best vendors to make your special day truly unforgettable.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-pink transition-colors" title="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-pink transition-colors" title="YouTube">
              <YoutubeIcon size={18} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-pink transition-colors" title="Pinterest">
              <PinterestIcon size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-8 text-gold">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/vendors" className="hover:text-white transition-colors">Browse Vendors</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Wedding Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xl font-bold mb-8 text-gold">Categories</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/vendors?category=lehenga" className="hover:text-white transition-colors">Lehenga Rentals</Link></li>
            <li><Link to="/vendors?category=makeup" className="hover:text-white transition-colors">Makeup Artists</Link></li>
            <li><Link to="/vendors?category=photography" className="hover:text-white transition-colors">Photographers</Link></li>
            <li><Link to="/vendors?category=mehndi" className="hover:text-white transition-colors">Mehndi Artists</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold mb-8 text-gold">Get In Touch</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold" />
              <span>support@shaadihub.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold mt-1" />
              <span>123 Wedding Lane, Luxury District, New Delhi, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© 2026 ShaadiHub. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
