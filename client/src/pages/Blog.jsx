import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "10 Most Beautiful Wedding Destinations in India",
    category: "Destinations",
    date: "May 10, 2026",
    author: "Aditi Sharma",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    excerpt: "From the beaches of Goa to the palaces of Udaipur, explore the most romantic spots to say 'I Do'."
  },
  {
    id: 2,
    title: "The Ultimate Guide to Choosing Your Wedding Photographer",
    category: "Photography",
    date: "May 8, 2026",
    author: "Rahul Verma",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800",
    excerpt: "Learn how to find a photographer who captures your style and personality perfectly."
  },
  {
    id: 3,
    title: "Top 5 Bridal Jewelry Trends for 2026",
    category: "Fashion",
    date: "May 5, 2026",
    author: "Priya Gupta",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Modern minimalism meets traditional heritage in this year's hottest bridal jewelry collections."
  },
  {
    id: 4,
    title: "How to Plan a Sustainable and Eco-Friendly Wedding",
    category: "Planning",
    date: "May 2, 2026",
    author: "Sonia Singh",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
    excerpt: "Beautiful ways to reduce your wedding's carbon footprint without compromising on style."
  },
  {
    id: 5,
    title: "Decoding the Modern Groom's Wedding Wardrobe",
    category: "Fashion",
    date: "April 28, 2026",
    author: "Amit Mehra",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
    excerpt: "Beyond the basic sherwani: exploring contemporary cuts and colors for the modern groom."
  },
  {
    id: 6,
    title: "Secret Tips for a Stress-Free Wedding Day",
    category: "Planning",
    date: "April 25, 2026",
    author: "Meera Reddy",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    excerpt: "Essential advice from wedding planners to help you enjoy every moment of your big day."
  }
];

const Blog = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    showToast('Successfully subscribed to our newsletter! ✨');
    setEmail('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft-cream relative">
      <Navbar dark={true} />
      
      {/* Custom Premium Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-dark-text text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md"
          >
            <div className="w-2 h-2 bg-primary-pink rounded-full animate-pulse" />
            <span className="font-bold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary-pink font-bold uppercase tracking-widest text-sm"
          >
            ShaadiHub Magazine
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif font-bold text-dark-text mt-4 mb-6"
          >
            Wedding Inspiration & Advice
          </motion.h1>
          <div className="w-24 h-1 bg-primary-pink mx-auto" />
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100"
        >
          <div className="md:w-3/5 h-[400px] md:h-auto overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Featured" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="md:w-2/5 p-12 flex flex-col justify-center">
            <span className="text-primary-pink font-bold uppercase tracking-widest text-xs mb-4">Featured Story</span>
            <h2 className="text-3xl font-bold text-dark-text mb-6 font-serif">Planning a Palace Wedding: Everything You Need to Know</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Experience the royal grandeur of a palace wedding. We break down the logistics, costs, and best venues for a king-sized celebration.
            </p>
            <Link to="/blog/1" className="flex items-center gap-2 text-dark-text font-bold hover:text-primary-pink transition-colors group">
              Read Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-pink text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-dark-text mb-4 line-clamp-2 hover:text-primary-pink transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.id}`} className="text-primary-pink font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 bg-dark-text rounded-[40px] p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Stay Inspired</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
              Subscribe to our newsletter and get the latest wedding trends, planning tips, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:bg-white/20 transition-all text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={loading} className="bg-primary-pink hover:bg-deep-pink text-white font-bold px-10 py-4 rounded-2xl shadow-lg transition-all text-lg whitespace-nowrap min-w-[200px] flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
