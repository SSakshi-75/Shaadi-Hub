import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import VendorCard from '../components/VendorCard';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import { Filter, Search as SearchIcon, MapPin } from 'lucide-react';

import Loader from '../components/Loader';

const VendorListing = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: '',
    maxPrice: '',
    minRating: '',
    availability: false,
  });

  const categories = ['Lehenga', 'Makeup', 'Photographer', 'DJ', 'Decoration', 'Mehendi', 'Caterer', 'Wedding Planner'];
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const search = searchParams.get('search') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minRating = searchParams.get('minRating') || '';
    const availability = searchParams.get('availability') === 'true';

    setFilters({ category, location, search, maxPrice, minRating, availability });
    
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (location) params.append('location', location);
        if (search) params.append('search', search);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (minRating) params.append('minRating', minRating);
        if (availability) params.append('availability', 'true');

        const { data } = await api.get(`/vendors?${params.toString()}`);
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    if (filters.category) newParams.category = filters.category;
    if (filters.location) newParams.location = filters.location;
    if (filters.search) newParams.search = filters.search;
    if (filters.maxPrice) newParams.maxPrice = filters.maxPrice;
    if (filters.minRating) newParams.minRating = filters.minRating;
    if (filters.availability) newParams.availability = 'true';
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-12 px-4 md:px-8">
      <SEO
        title="Find Vendors"
        description="Browse our curated list of top-rated wedding vendors. Filter by category, location, and budget to find the perfect match for your big day."
        type="website"
      />
      <Navbar dark={true} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-dark-text mb-8">Discover Vendors</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-primary-pink font-bold">
                <Filter size={20} />
                <span>Filters</span>
              </div>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="E.g. Photographer..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary-pink"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                  <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </form>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-primary-pink"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary-pink"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget (₹)</label>
                <input
                  type="number"
                  placeholder="E.g. 20000"
                  className="w-full p-2 border rounded-lg focus:ring-primary-pink"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-primary-pink"
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              {/* Availability */}
              <div className="mb-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="availability"
                  className="w-4 h-4 text-primary-pink focus:ring-primary-pink border-gray-300 rounded"
                  checked={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.checked })}
                />
                <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                  Available Only
                </label>
              </div>

              <button
                onClick={handleSearchSubmit}
                className="w-full btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {loading ? (
              <Loader />
            ) : vendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vendors.map(vendor => (
                  <VendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl text-center shadow-md">
                <p className="text-gray-500 text-lg">No vendors found matching your criteria.</p>
                <button
                  onClick={() => setSearchParams({})}
                  className="text-primary-pink mt-4 font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorListing;
