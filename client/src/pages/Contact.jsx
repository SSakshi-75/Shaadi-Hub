import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft-cream">
      <Navbar dark={true} />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-serif font-bold text-dark-text mb-4"
            >
              Get in Touch
            </motion.h1>
            <div className="w-24 h-1 bg-primary-pink mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Have questions about your wedding planning? We're here to help you create your dream wedding.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-50">
                <h3 className="text-2xl font-bold text-dark-text mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="text-primary-pink" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                      <p className="text-lg text-dark-text font-medium">support@shaadihub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="text-primary-pink" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                      <p className="text-lg text-dark-text font-medium">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="text-primary-pink" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Visit Us</p>
                      <p className="text-lg text-dark-text font-medium">123 Wedding Lane, Luxury District,<br />New Delhi, India 110001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social or Hours */}
              <div className="bg-primary-pink p-8 rounded-3xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
                <p className="opacity-90 mb-4">Our dedicated team is available to assist you during the following hours:</p>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Saturday</span>
                    <span className="font-bold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink transition-all outline-none"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink transition-all outline-none"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink transition-all outline-none"
                    placeholder="Wedding Planning Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows="5"
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink transition-all outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-pink text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 hover:bg-deep-pink transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
