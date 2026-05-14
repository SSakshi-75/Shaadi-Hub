import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/vendors?search=${search}`);
  };

  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in slide-in-from-bottom duration-700">
          Find Your Perfect <span className="text-gold">Wedding Vendors</span>
        </h1>
        <p className="text-xl text-white/90 mb-10 animate-in slide-in-from-bottom duration-700 delay-200">
          Connecting you with the best Lehenga Rentals, Makeup Artists, and more.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-2xl mx-auto animate-in zoom-in duration-500 delay-400">
          <div className="flex-1 px-6 flex items-center gap-2 border-r border-gray-200">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by category or city..." 
              className="w-full py-3 focus:outline-none text-dark-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-primary-pink text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
