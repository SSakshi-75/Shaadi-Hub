import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Star, Phone, MessageCircle, ArrowLeft, ArrowRight, Flag, Send } from 'lucide-react';

import Loader from '../components/Loader';
import ReportModal from '../components/ReportModal';
import InquiryModal from '../components/InquiryModal';

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleBookingSubmit = async () => {
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/bookings', {
        vendorId: id,
        eventDate: new Date().toISOString(), // Default to today or prompt user
        totalAmount: Number(vendor.pricing) || 0
      });
      alert('Booking request sent successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const { data } = await api.get(`/vendors/${id}`);
        setVendor(data);
      } catch (error) {
        console.error('Error fetching vendor details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  if (loading) return <Loader fullPage={true} />;
  if (!vendor) return <div className="min-h-screen flex items-center justify-center">Vendor not found</div>;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % vendor.gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + vendor.gallery.length) % vendor.gallery.length);

  const whatsappMessage = `Hi ${vendor.businessName}, I found your profile on ShaadiHub and I'm interested in your services.`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-12 px-4 md:px-8">
      <SEO 
        title={`${vendor.businessName} - ${vendor.category}`}
        description={`${vendor.businessName} is a top-rated ${vendor.category} in ${vendor.location}. Book them on ShaadiHub for your wedding.`}
        type="article"
      />
      <Navbar dark={true} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Gallery Section */}
          <div className="lg:w-1/2 relative group">
            <div className="h-[400px] lg:h-full bg-gray-200">
              <img 
                src={vendor.gallery[activeImage] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80'} 
                className="w-full h-full object-cover transition-opacity duration-500"
                alt="portfolio"
              />
            </div>
            
            {vendor.gallery.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {vendor.gallery.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${i === activeImage ? 'bg-primary-pink' : 'bg-white/50'}`} 
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-primary-pink font-bold text-sm uppercase tracking-widest">{vendor.category}</span>
                <h1 className="text-4xl font-bold text-dark-text mt-2">{vendor.businessName}</h1>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <MapPin size={18} />
                  <span>{vendor.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-gold/10 px-3 py-1 rounded-full text-gold font-bold">
                <Star size={18} fill="currentColor" />
                <span>{(vendor.ratings && !isNaN(vendor.ratings)) ? Number(vendor.ratings).toFixed(1) : 'New'}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-dark-text mb-2">About Services</h3>
                <p className="text-gray-600 leading-relaxed">{vendor.description}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Custom Inquiry</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Need specific details? Send a custom request.</p>
                </div>
                <button 
                  onClick={() => {
                    if(!user) return navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
                    setIsInquiryModalOpen(true);
                  }}
                  className="bg-white border border-slate-200 text-slate-900 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  Ask a Question
                </button>
              </div>

              <div className="bg-soft-cream p-6 rounded-2xl border border-gold/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Starting Price</span>
                  <span className="text-2xl font-bold text-primary-pink">
                    {vendor.pricing && !isNaN(vendor.pricing) ? `₹${Number(vendor.pricing).toLocaleString('en-IN')}` : 'Contact for Price'}
                  </span>
                </div>
                
                {user && user.role !== 'admin' ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <a 
                        href={vendor.whatsapp ? `https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(whatsappMessage)}` : whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                      >
                        <MessageCircle size={20} />
                        WhatsApp
                      </a>
                      <button 
                        onClick={() => setIsInquiryModalOpen(true)}
                        className="flex-1 bg-primary-pink text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-deep-pink transition-all shadow-lg shadow-primary-pink/20"
                      >
                        <Send size={18} />
                        Inquiry
                      </button>
                    </div>
                    <button 
                      onClick={handleBookingSubmit}
                      disabled={submitting}
                      className="w-full btn-primary"
                    >
                      {submitting ? 'Processing...' : 'Book Now'}
                    </button>
                  </div>
                ) : user?.role === 'admin' ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Administrative View Only</p>
                    <p className="text-[10px] text-slate-400 mt-1">Contact and Booking actions are disabled for administrators.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link 
                      to={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}
                      className="w-full bg-primary-pink text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors"
                    >
                      Login to View Contact
                    </Link>
                    <p className="text-[10px] text-center text-gray-400">
                      Authorized users only can contact vendors directly.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl flex items-center gap-3">
                  <div className="bg-primary-pink/10 p-2 rounded-lg text-primary-pink">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-bold">5+ Years</p>
                  </div>
                </div>
                <div className="p-4 border rounded-xl flex items-center gap-3">
                  <div className="bg-primary-pink/10 p-2 rounded-lg text-primary-pink">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="font-bold">120+ Events</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 mt-6 flex justify-center">
                <button 
                  onClick={() => {
                    if(!user) return navigate('/login');
                    setIsReportModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-rose-500 font-bold text-xs hover:text-rose-700 transition-colors uppercase tracking-widest"
                >
                  <Flag size={14} />
                  Report This Vendor
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        vendorId={id} 
        vendorName={vendor.businessName}
      />
      <InquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)} 
        vendorId={id} 
        vendorName={vendor.businessName}
      />
    </div>
  );
};

export default VendorDetails;
