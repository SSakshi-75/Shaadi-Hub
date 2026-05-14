import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor._id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={vendor.gallery?.[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80'} 
          alt={vendor.businessName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-pink">
          {vendor.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-dark-text">{vendor.businessName}</h3>
          <div className="flex items-center gap-1 text-gold">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-bold">{(vendor.ratings && !isNaN(vendor.ratings)) ? Number(vendor.ratings).toFixed(1) : 'New'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin size={14} />
          <span>{vendor.location}</span>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div>
            <span className="text-gray-400 text-xs block">Starts from</span>
            <span className="text-lg font-bold text-primary-pink">
              {vendor.pricing && !isNaN(vendor.pricing) ? `₹${Number(vendor.pricing).toLocaleString('en-IN')}` : 'Contact for Price'}
            </span>
          </div>
          <button className="btn-secondary py-2 px-4 text-sm">View Details</button>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;
