import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, MessageCircle, CheckCircle2 } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // In a real app, you'd fetch the post by ID. For now, we'll use mock data.
  const post = {
    title: "Planning a Palace Wedding: Everything You Need to Know",
    category: "Destinations",
    date: "May 12, 2026",
    author: "Aditi Sharma",
    image: "https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1200",
    content: `
      <p className="text-lg text-gray-600 leading-relaxed mb-6 font-sans">
        A palace wedding in India is the epitome of luxury and tradition. It's about more than just a beautiful venue; it's about experiencing the royal heritage and creating a celebration that feels like a page out of a history book.
      </p>
      <h3 className="text-2xl font-bold text-dark-text mb-4 font-serif">1. Choosing the Right Palace</h3>
      <p className="text-gray-600 mb-6 font-sans">
        Rajasthan is home to some of the most stunning palaces in the world. From the Lake Palace in Udaipur to the Rambagh Palace in Jaipur, each venue offers a unique atmosphere. Consider the guest capacity, accessibility, and the specific 'vibe' you want for your wedding.
      </p>
      <h3 className="text-2xl font-bold text-dark-text mb-4 font-serif">2. Logistics and Planning</h3>
      <p className="text-gray-600 mb-6 font-sans">
        Palace weddings require meticulous planning. Logistics can be complex, especially if the palace is in a remote location. Working with a planner who has experience with heritage properties is essential to ensure everything from decor to catering is handled seamlessly.
      </p>
      <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 mb-8 italic text-pink-800 font-serif">
        "The grandeur of a palace doesn't need much to look beautiful. Minimalist decor often works best to let the architecture shine." - Aditi Sharma
      </div>
      <h3 className="text-2xl font-bold text-dark-text mb-4 font-serif">3. Cultural Authenticity</h3>
      <p className="text-gray-600 mb-6 font-sans">
        Incorporate local traditions into your celebration. Whether it's a traditional Rajasthani folk performance or local delicacies in your menu, adding these touches makes the experience truly authentic for you and your guests.
      </p>
    `
  };

  return (
    <div className="min-h-screen bg-white relative">
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
            <CheckCircle2 className="text-primary-pink" size={20} />
            <span className="font-bold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-pink font-bold mb-8 hover:gap-3 transition-all font-sans">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="bg-pink-50 text-primary-pink text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block uppercase tracking-widest font-sans">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-text mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-400 border-b border-gray-100 pb-8 font-sans">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/100?u=aditi" alt="author" />
                </div>
                <span className="font-medium text-dark-text">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[40px] overflow-hidden mb-12 shadow-2xl h-[500px]"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <div className="prose prose-pink max-w-none mb-16">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Social Share */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="font-bold text-dark-text font-sans">Share this article:</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Link copied to clipboard!');
                }}
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-pink hover:text-white transition-all shadow-sm"
                title="Copy Link"
              >
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => document.getElementById('comment-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-pink hover:text-white transition-all shadow-sm"
                title="Go to Comments"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div id="comment-section" className="mb-20 bg-soft-cream p-10 rounded-[40px] border border-pink-50">
            <h3 className="text-2xl font-bold text-dark-text mb-8 font-serif">Discussion</h3>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full shrink-0 flex items-center justify-center font-bold text-primary-pink font-sans">S</div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-50">
                    <p className="font-bold text-sm mb-1 font-sans">Sneha Kapoor</p>
                    <p className="text-gray-600 text-sm leading-relaxed font-sans">This is exactly what I needed! Planning a destination wedding in Udaipur and these tips are gold.</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-2 ml-4 block font-sans">2 hours ago</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); showToast('Comment submitted for review!'); }}>
              <textarea 
                placeholder="Join the discussion..." 
                className="w-full p-6 rounded-3xl border border-white bg-white shadow-sm focus:ring-2 focus:ring-primary-pink outline-none transition-all resize-none font-sans"
                rows="3"
              ></textarea>
              <button className="bg-primary-pink text-white font-bold px-10 py-4 rounded-full hover:bg-deep-pink transition-all shadow-lg shadow-pink-100 font-sans transform hover:-translate-y-0.5">
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
