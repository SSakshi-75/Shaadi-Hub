import React, { useState, useEffect, useCallback, useContext } from 'react';
import api from '../services/api';
import { 
  Check, X, Clock, Calendar, IndianRupee, 
  LayoutDashboard, MessageSquare, User, 
  Trash2, Plus, Save,
  Camera, MapPin, Phone,
  Star, ExternalLink, Bell, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const VendorDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [bookingsRes, inquiriesRes, profileRes, notificationsRes] = await Promise.all([
        api.get('/bookings/vendor'),
        api.get('/inquiries/vendor'),
        api.get('/vendors/me'),
        api.get('/notifications/my')
      ]);
      setBookings(bookingsRes.data);
      setInquiries(inquiriesRes.data);
      setVendorData(profileRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
      if (error.response?.status === 404) {
        window.location.href = '/become-vendor';
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateBookingStatus = async (bookingId, status) => {
    setActionLoading(bookingId);
    try {
      await api.put('/bookings/status', { bookingId, status });
      await fetchData();
      toast.success(`Booking ${status} successfully!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/vendors', vendorData);
      toast.success('Profile updated successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#F4F7FE' }}>
      <div className="relative w-20 h-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 rounded-full"
          style={{ borderColor: 'rgba(108, 74, 182, 0.2)', borderTopColor: '#6C4AB6' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-lg rotate-45 shadow-lg shadow-purple-200" style={{ backgroundColor: '#6C4AB6' }} />
        </motion.div>
      </div>
      <p className="mt-8 font-bold uppercase animate-pulse" style={{ color: '#6C4AB6', fontSize: '12px', letterSpacing: '0.3em' }}>Syncing Studio</p>
    </div>
  );

  const totalEarnings = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const activeBookingsCount = bookings.filter(b => b.status === 'accepted').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'pending').length;

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'inquiries', icon: MessageSquare, label: 'Inquiries' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Business Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden font-sans" style={{ backgroundColor: '#F4F7FE' }}>
      <aside 
        className={`w-80 bg-white h-screen border-r border-gray-100 flex flex-col p-8 fixed md:sticky top-0 z-40 transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="text-2xl font-serif font-black tracking-tighter flex items-center">
              <span className="text-gold group-hover:scale-110 transition-transform">SHAADI</span>
              <span className="text-dark-text ml-1">HUB</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative ${
                activeTab === item.id 
                ? 'text-white translate-x-2' 
                : 'text-gray-500 hover:bg-purple-50 hover:translate-x-1'
              }`}
              style={activeTab === item.id ? { 
                background: 'linear-gradient(to right, #6C4AB6, #8D72E1)',
                boxShadow: '0 10px 15px -3px rgba(108, 74, 182, 0.2)'
              } : {}}
            >
              <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
              <span className="font-bold tracking-tight">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-gold rounded-full" style={{ boxShadow: '0 0 10px #D4AF37' }}></div>
              )}
            </button>
          ))}
          
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group text-rose-500 hover:bg-rose-50"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-tight">Logout</span>
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="bg-white p-6 border border-gray-100 shadow-sm" style={{ borderRadius: '30px' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="font-black text-gray-400 uppercase tracking-widest" style={{ fontSize: '10px' }}>Live Status</span>
            </div>
            <p className="text-gray-600 leading-relaxed font-medium" style={{ fontSize: '11px' }}>Your brand is currently live & visible.</p>
          </div>
        </div>
      </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-screen overflow-y-auto">
          {/* Top Bar */}
          <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-30 shadow-sm">
             <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 text-gray-400 md:hidden bg-gray-50 rounded-xl border border-gray-100">
                   <LayoutDashboard size={20} />
                </button>
                <div className="hidden md:flex items-center gap-4 bg-gray-50 px-6 py-2.5 rounded-2xl w-full max-w-md border border-gray-200 group">
                   <Plus size={18} className="text-gray-400" />
                   <input type="text" placeholder="Search analytics, bookings..." className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full placeholder:text-gray-400" />
                </div>
             </div>
             
             <div className="flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className="relative p-2.5 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 hover:text-purple-600 transition-colors"
                >
                   <Bell size={20} />
                   {notifications.filter(n => !n.isRead).length > 0 && (
                     <span className="absolute -top-1 -right-1 w-5 h-5 rounded-lg border-2 border-white text-white flex items-center justify-center font-bold" style={{ backgroundColor: '#6C4AB6', fontSize: '10px' }}>
                       {notifications.filter(n => !n.isRead).length}
                     </span>
                   )}
                </button>
                <div className="h-8 hidden md:block" style={{ width: '1px', backgroundColor: '#E5E7EB' }}></div>
                <div className="flex items-center gap-4 group cursor-pointer p-1 pr-4 rounded-2xl hover:bg-gray-50 transition-all">
                   <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-100"
                      style={{ background: 'linear-gradient(to top right, #52339a, #6C4AB6)' }}
                   >
                      {vendorData?.businessName?.[0]}
                   </div>
                   <div className="hidden lg:block text-left">
                      <p className="text-sm font-black text-dark-text leading-tight tracking-tight">{vendorData?.businessName}</p>
                      <p className="font-bold uppercase mt-0.5 tracking-tighter" style={{ color: '#6C4AB6', fontSize: '10px', letterSpacing: '0.1em' }}>Verified Professional</p>
                   </div>
                </div>
             </div>
          </header>

          <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark-text tracking-tighter">Analytics Console</h1>
                    <p className="text-gray-400 font-medium text-sm">Performance overview and business growth tracking.</p>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => window.open(`/vendor/${vendorData?._id}`, '_blank')} className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-xs font-black text-dark-text hover:shadow-xl transition-all group">
                        <ExternalLink size={16} className="text-gold" />
                        Live Portfolio
                     </button>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Earnings', val: `₹${totalEarnings.toLocaleString()}`, icon: IndianRupee },
                    { label: 'Confirmed Events', val: activeBookingsCount, icon: Calendar },
                    { label: 'Inbound Leads', val: newInquiriesCount, icon: MessageSquare }
                  ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      className="group bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                      style={{ borderRadius: '40px' }}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100" style={{ color: '#6C4AB6' }}>
                            <s.icon size={24} />
                          </div>
                          <span className="font-black px-3 py-1 bg-gray-100 text-gray-500 rounded-full border border-gray-200 uppercase tracking-widest" style={{ fontSize: '9px' }}>Global</span>
                        </div>
                        <p className="text-gray-400 font-black uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>{s.label}</p>
                        <h3 className="text-2xl font-serif font-bold text-dark-text tracking-tighter">{s.val}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions & Recent */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 border border-gray-100 shadow-sm" style={{ borderRadius: '40px' }}>
                    <h3 className="text-xl font-serif font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setActiveTab('profile')} className="p-6 border border-gray-50 hover:text-white transition-all duration-500 text-left group" style={{ backgroundColor: 'rgba(108, 74, 182, 0.05)', borderRadius: '30px' }}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                          <Camera style={{ color: '#6C4AB6' }} size={20} />
                        </div>
                        <p className="font-bold text-sm mb-0.5">Update Gallery</p>
                        <p className="opacity-60" style={{ fontSize: '10px' }}>Add your latest work</p>
                      </button>
                      <button onClick={() => setActiveTab('bookings')} className="p-6 border border-gray-50 hover:text-white transition-all duration-500 text-left group" style={{ backgroundColor: 'rgba(108, 74, 182, 0.05)', borderRadius: '30px' }}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                          <Clock style={{ color: '#6C4AB6' }} size={20} />
                        </div>
                        <p className="font-bold text-sm mb-0.5">Schedule</p>
                        <p className="opacity-60" style={{ fontSize: '10px' }}>Review event dates</p>
                      </button>
                    </div>
                  </div>

                  <div className="p-8 text-white shadow-2xl relative overflow-hidden" style={{ backgroundColor: '#0F172A', borderRadius: '40px' }}>
                     <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full" style={{ backgroundColor: 'rgba(108, 74, 182, 0.2)' }}></div>
                     <h3 className="text-xl font-serif font-bold mb-6">Growth Tip</h3>
                     <div className="space-y-4">
                        <div className="flex gap-4 p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                           <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(108, 74, 182, 0.2)' }}>
                              <Star size={16} className="text-gold" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-white mb-1">High-Quality Visuals</p>
                              <p className="text-gray-400 leading-relaxed" style={{ fontSize: '10px' }}>Bright photos receive 3x more inquiries. Keep your portfolio fresh!</p>
                           </div>
                        </div>
                        <button onClick={() => setActiveTab('profile')} className="w-full py-3 bg-white font-black uppercase tracking-widest rounded-xl hover:bg-gold transition-all" style={{ color: '#6C4AB6', fontSize: '10px' }}>Optimize Profile</button>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div 
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full"
              >
                {bookings.length > 0 ? (
                  <div className="bg-white border border-gray-50 overflow-hidden shadow-sm" style={{ borderRadius: '45px' }}>
                    <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                      <h2 className="text-3xl font-serif font-bold text-dark-text tracking-tighter">Event Registry</h2>
                      <div className="px-6 py-2 bg-purple-50 rounded-full border border-purple-100">
                         <span className="font-black uppercase tracking-widest" style={{ color: '#6C4AB6', fontSize: '11px' }}>{bookings.length} Total Bookings</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="font-black text-gray-400 uppercase tracking-widest bg-gray-50" style={{ fontSize: '10px' }}>
                          <tr>
                            <th className="px-12 py-8">Customer</th>
                            <th className="px-12 py-8">Event Date</th>
                            <th className="px-12 py-8">Status</th>
                            <th className="px-12 py-8 text-right">Operations</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {bookings.map((booking) => (
                            <tr key={booking._id} className="group hover:bg-purple-50 transition-colors">
                              <td className="px-12 py-10">
                                <p className="font-bold text-dark-text text-lg tracking-tight">{booking.user.name}</p>
                                <p className="text-xs text-gray-400 font-medium mt-1">{booking.user.email}</p>
                              </td>
                              <td className="px-12 py-10">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center" style={{ color: '#6C4AB6' }}>
                                     <Calendar size={14} />
                                  </div>
                                  <span className="text-sm font-bold text-gray-600">{new Date(booking.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                              </td>
                              <td className="px-12 py-10">
                                <span className="px-4 py-1.5 rounded-full font-black uppercase tracking-widest" style={{ fontSize: '10px', backgroundColor: booking.status === 'pending' ? '#FEF9C3' : booking.status === 'accepted' ? '#D1FAE5' : '#FFE4E6', color: booking.status === 'pending' ? '#A16207' : booking.status === 'accepted' ? '#047857' : '#BE123C' }}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="px-12 py-10 text-right">
                                {booking.status === 'pending' && (
                                  <div className="flex justify-end gap-3">
                                    {actionLoading === booking._id ? (
                                      <div className="p-2">
                                        <div className="w-6 h-6 border-2 border-t-purple-600 rounded-full animate-spin" style={{ borderColor: 'rgba(108, 74, 182, 0.2)' }} />
                                      </div>
                                    ) : (
                                      <>
                                        <button 
                                          onClick={() => updateBookingStatus(booking._id, 'accepted')} 
                                          className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100 hover:scale-110 transition-transform"
                                        >
                                          <Check size={18} />
                                        </button>
                                        <button 
                                          onClick={() => updateBookingStatus(booking._id, 'rejected')} 
                                          className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-100 hover:scale-110 transition-transform"
                                        >
                                          <X size={18} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-24 border border-gray-100 flex flex-col items-center text-center shadow-sm w-full" style={{ borderRadius: '50px' }}>
                     <div className="w-24 h-24 bg-purple-50 rounded-3xl flex items-center justify-center mb-8" style={{ borderRadius: '40px' }}>
                        <Calendar size={40} className="text-purple-300" />
                     </div>
                     <h3 className="text-3xl font-serif font-bold text-dark-text mb-3">No active bookings</h3>
                     <p className="text-gray-400 max-w-sm text-base">Your premium service portfolio is live. New booking requests from clients will appear here.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div 
                 key="inquiries"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="w-full"
              >
                {inquiries.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry._id} className="bg-white p-10 border border-gray-50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group" style={{ borderRadius: '45px' }}>
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full group-hover:scale-150 transition-transform" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}></div>
                        
                        <div className="flex justify-between items-start mb-10 relative z-10">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold text-gold" style={{ backgroundColor: '#0F172A', borderRadius: '20px' }}>
                                {inquiry.user.name[0]}
                             </div>
                             <div>
                               <h3 className="text-2xl font-serif font-bold text-dark-text transition-colors tracking-tight">{inquiry.user.name}</h3>
                               <p className="text-xs text-gray-400 font-medium">{inquiry.user.email}</p>
                             </div>
                          </div>
                          <span className="text-gold font-black px-4 py-1.5 rounded-full uppercase tracking-widest border" style={{ fontSize: '10px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>New Lead</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                          <div className="p-5 border" style={{ backgroundColor: 'rgba(108, 74, 182, 0.05)', borderColor: 'rgba(108, 74, 182, 0.1)', borderRadius: '25px' }}>
                            <p className="text-gray-400 uppercase tracking-widest mb-1 font-black" style={{ fontSize: '10px' }}>Location</p>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} style={{ color: '#6C4AB6' }} />
                              <p className="text-sm font-bold text-dark-text">{inquiry.city || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="p-5 border" style={{ backgroundColor: 'rgba(108, 74, 182, 0.05)', borderColor: 'rgba(108, 74, 182, 0.1)', borderRadius: '25px' }}>
                            <p className="text-gray-400 uppercase tracking-widest mb-1 font-black" style={{ fontSize: '10px' }}>Event Date</p>
                            <div className="flex items-center gap-2">
                              <Calendar size={14} style={{ color: '#6C4AB6' }} />
                              <p className="text-sm font-bold text-dark-text">{new Date(inquiry.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                            </div>
                          </div>
                          <div className="p-5 border" style={{ backgroundColor: 'rgba(108, 74, 182, 0.05)', borderColor: 'rgba(108, 74, 182, 0.1)', borderRadius: '25px' }}>
                            <p className="text-gray-400 uppercase tracking-widest mb-1 font-black" style={{ fontSize: '10px' }}>Budget</p>
                            <div className="flex items-center gap-2">
                              <IndianRupee size={14} style={{ color: '#6C4AB6' }} />
                              <p className="text-sm font-bold text-dark-text">{inquiry.budget}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-3xl relative z-10">
                           <p className="text-gray-500 text-sm leading-relaxed">"{inquiry.message}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-24 border border-gray-100 flex flex-col items-center text-center shadow-sm w-full" style={{ borderRadius: '50px' }}>
                     <div className="w-24 h-24 bg-purple-50 flex items-center justify-center mb-8" style={{ borderRadius: '40px' }}>
                        <MessageSquare size={40} className="text-purple-300" />
                     </div>
                     <h3 className="text-3xl font-serif font-bold text-dark-text mb-3">No inquiries received</h3>
                     <p className="text-gray-400 max-w-md text-base">Client messages and quote requests will appear here once they visit your portfolio.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 max-w-4xl mx-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-serif font-bold text-dark-text tracking-tighter">System Notifications</h2>
                  <span className="px-4 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-black uppercase tracking-widest border border-purple-100">
                    {notifications.length} Alerts
                  </span>
                </div>

                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map(n => (
                      <div 
                        key={n._id} 
                        className={`p-6 bg-white border-2 rounded-[32px] transition-all flex items-center justify-between shadow-sm ${
                          n.isRead ? 'border-gray-50 opacity-80' : 'border-purple-100 shadow-purple-100/50 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                            n.title.includes('Approved') ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                          }`}>
                            <Bell size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-dark-text">{n.title}</h4>
                              {!n.isRead && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{new Date(n.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        {!n.isRead && (
                          <button 
                            onClick={async () => {
                              try {
                                await api.patch(`/notifications/${n._id}/read`);
                                setNotifications(prev => prev.map(notif => notif._id === n._id ? { ...notif, isRead: true } : notif));
                              } catch (err) {
                                console.error('Failed to mark read', err);
                              }
                            }}
                            className="p-3 bg-dark-text text-white rounded-xl hover:bg-purple-600 transition-all shadow-md active:scale-95"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button 
                          onClick={async () => {
                            try {
                              await api.delete(`/notifications/${n._id}`);
                              setNotifications(prev => prev.filter(notif => notif._id !== n._id));
                              toast.success('Notification removed');
                            } catch (err) {
                              toast.error('Failed to remove notification');
                            }
                          }}
                          className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-20 border border-gray-100 flex flex-col items-center text-center" style={{ borderRadius: '40px' }}>
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                       <Bell size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-text mb-2">No notifications yet</h3>
                    <p className="text-gray-400 text-sm max-w-xs">System alerts and profile updates will appear here.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <form onSubmit={handleProfileUpdate} className="bg-white p-12 border border-gray-50 shadow-sm max-w-5xl mx-auto" style={{ borderRadius: '50px' }}>
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                      <h2 className="text-4xl font-serif font-bold text-dark-text tracking-tighter">Business Studio</h2>
                      <p className="text-gray-400 font-medium mt-1">Refine your professional appearance on ShaadiHub.</p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl flex items-center gap-3 active:scale-95"
                      style={{ backgroundColor: '#6C4AB6', boxShadow: '0 20px 25px -5px rgba(108, 74, 182, 0.2)' }}
                    >
                      {saving ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save size={20} />
                          <span>Synchronize Changes</span>
                        </>
                      )}
                    </button>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <section className="space-y-8">
                         <h4 className="font-black text-gray-400 uppercase border-b border-gray-100 pb-4" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>Identity & Logistics</h4>
                         <div className="space-y-6">
                            <div>
                              <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><User size={14} style={{ color: '#6C4AB6' }} /> Business Name</label>
                              <input 
                                type="text" 
                                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text placeholder:text-gray-300 transition-all shadow-inner"
                                value={vendorData.businessName}
                                onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><IndianRupee size={14} style={{ color: '#6C4AB6' }} /> Pricing Range</label>
                                <input 
                                  type="text" 
                                  className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text shadow-inner"
                                  value={vendorData.pricing}
                                  onChange={(e) => setVendorData({...vendorData, pricing: e.target.value})}
                                />
                              </div>
                              <div>
                                <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><MapPin size={14} style={{ color: '#6C4AB6' }} /> Primary Location</label>
                                <input 
                                  type="text" 
                                  className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text shadow-inner"
                                  value={vendorData.location}
                                  onChange={(e) => setVendorData({...vendorData, location: e.target.value})}
                                />
                              </div>
                            </div>
                         </div>
                      </section>

                      <section className="space-y-8">
                         <h4 className="font-black text-gray-400 uppercase border-b border-gray-100 pb-4" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>Social Connect</h4>
                         <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><Phone size={14} style={{ color: '#6C4AB6' }} /> Contact Number</label>
                              <input 
                                type="text" 
                                maxLength="10"
                                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text shadow-inner"
                                value={vendorData.phone}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  if (value.length <= 10) setVendorData({...vendorData, phone: value});
                                }}
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><MessageSquare size={14} className="text-green-500" /> WhatsApp</label>
                              <input 
                                type="text" 
                                maxLength="10"
                                className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text shadow-inner"
                                value={vendorData.whatsapp}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  if (value.length <= 10) setVendorData({...vendorData, whatsapp: value});
                                }}
                              />
                            </div>
                         </div>
                         <div>
                            <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3"><InstagramIcon size={14} style={{ color: '#6C4AB6' }} /> Instagram Handle</label>
                            <input 
                              type="text" 
                              className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 font-bold text-dark-text shadow-inner"
                              placeholder="@your_brand"
                              value={vendorData.instagram}
                              onChange={(e) => setVendorData({...vendorData, instagram: e.target.value})}
                            />
                          </div>
                      </section>
                    </div>

                    <div className="space-y-10">
                      <section className="space-y-8">
                         <h4 className="font-black text-gray-400 uppercase border-b border-gray-100 pb-4" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>Brand Story</h4>
                         <div>
                            <label className="flex items-center gap-2 text-xs font-black text-dark-text uppercase tracking-widest mb-3">Service Narrative</label>
                            <textarea 
                              rows="14"
                              className="w-full bg-gray-50 border-none p-6 focus:ring-2 font-medium text-gray-600 leading-relaxed shadow-inner resize-none"
                              style={{ borderRadius: '35px' }}
                              placeholder="Describe your unique approach to weddings..."
                              value={vendorData.description}
                              onChange={(e) => setVendorData({...vendorData, description: e.target.value})}
                            />
                          </div>
                      </section>
                    </div>
                  </div>

                  {/* Portfolio Management */}
                  <div className="mt-20">
                    <h4 className="font-black text-gray-400 uppercase border-b border-gray-100 pb-4 mb-10" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>Portfolio Gallery Management</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-8">
                      {vendorData.gallery.map((img, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -10 }}
                          className="relative group overflow-hidden shadow-lg shadow-purple-100"
                          style={{ aspectRatio: '4/5', borderRadius: '30px' }}
                        >
                          <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="gallery" />
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(76, 29, 149, 0.4)' }}>
                             <button 
                               type="button"
                               onClick={() => {
                                 const newGallery = vendorData.gallery.filter((_, idx) => idx !== i);
                                 setVendorData({...vendorData, gallery: newGallery});
                                }}
                               className="bg-white text-purple-900 p-4 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-xl"
                             >
                               <Trash2 size={20} />
                             </button>
                           </div>
                         </motion.div>
                       ))}
                       <motion.div 
                         whileHover={{ scale: 1.05 }}
                         onClick={() => window.location.href = '/become-vendor'}
                         className="bg-purple-50 border-2 border-dashed border-purple-200 flex flex-col items-center justify-center cursor-pointer transition-all duration-500"
                          style={{ aspectRatio: '4/5', color: '#6C4AB6', borderRadius: '30px' }}
                       >
                         <div className="w-16 h-16 bg-white flex items-center justify-center mb-4 shadow-sm" style={{ borderRadius: '20px' }}>
                            <Plus size={32} />
                         </div>
                         <span className="font-black uppercase tracking-widest" style={{ fontSize: '10px' }}>New Capture</span>
                       </motion.div>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
        </AnimatePresence>
        </div>

      </main>
    </div>
  );
};

export default VendorDashboard;
