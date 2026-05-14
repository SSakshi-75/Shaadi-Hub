import { useState, useEffect } from 'react';
import api from '../services/api';
import VendorCard from './VendorCard';
import { motion } from 'framer-motion';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const FeaturedVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await api.get('/vendors');
        setVendors(data.slice(0, 6)); // Show top 6
      } catch (error) {
        console.error('Error fetching vendors', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) return <Loader />;
  if (vendors.length === 0) return null;

  return (
    <section className="py-20 bg-soft-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-dark-text mb-2">Featured Vendors</h2>
            <div className="w-20 h-1 bg-primary-pink" />
          </div>
          <Link to="/vendors" className="text-primary-pink font-bold hover:underline hover:scale-105 transition-transform inline-block">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <VendorCard vendor={vendor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
