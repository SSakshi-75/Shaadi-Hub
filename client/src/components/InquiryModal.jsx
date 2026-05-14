import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { X, Send, Calendar, User, Mail, Phone, MessageSquare, MapPin, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const InquiryModal = ({ isOpen, onClose, vendorId, vendorName }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    eventDate: '',
    city: '',
    budget: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to send an inquiry');
      return;
    }

    setLoading(true);
    try {
      await api.post('/inquiries', {
        vendorId,
        ...formData
      });
      toast.success('Inquiry sent successfully to ' + vendorName);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="bg-primary-pink p-8 text-white relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-serif font-bold">Send Inquiry</h2>
            <p className="text-white/80 text-sm mt-1">Direct message to <span className="font-bold underline">{vendorName}</span></p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="tel" 
                    required
                    maxLength="10"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Event Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your City</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Approximate Budget (₹)</label>
              <div className="relative">
                <IndianRupee size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all"
                  placeholder="e.g. 50,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
              <div className="relative">
                <MessageSquare size={14} className="absolute left-4 top-4 text-gray-400" />
                <textarea 
                  required
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-pink/20 outline-none transition-all resize-none"
                  placeholder="Tell the vendor about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-pink hover:bg-deep-pink text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-pink/20 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Inquiry Now</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryModal;
