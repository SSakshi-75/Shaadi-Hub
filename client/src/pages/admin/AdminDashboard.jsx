import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import {
  Users, Store, CreditCard,
  Check, X, Shield, BarChart3, Search,
  Bell, Calendar,
  Settings, LogOut, LayoutDashboard, Star,
  Trash2, AlertCircle, Clock, CheckCircle2,
  XCircle, Ban, Filter,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/Loader';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight as ArrowRightIcon } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ stats: null, vendors: [], users: [] });
  const [reports, setReports] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        setLoading(false);
        return;
      }
      if (user.role !== 'admin') {
        setError(`Your current role (${user.role}) does not have administrative privileges.`);
        setLoading(false);
        return;
      }

      const [statsRes, vendorsRes, usersRes, reportsRes, inquiriesRes, reviewsRes, categoriesRes, notificationsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/vendors'),
        api.get('/admin/users'),
        api.get('/admin/reports'),
        api.get('/admin/inquiries'),
        api.get('/admin/reviews'),
        api.get('/admin/categories'),
        api.get('/admin/notifications')
      ]);
      setData({
        stats: statsRes.data,
        vendors: vendorsRes.data,
        users: usersRes.data
      });
      setReports(reportsRes.data);
      setInquiries(inquiriesRes.data);
      setReviews(reviewsRes.data);
      setCategories(categoriesRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Error fetching admin data', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        setError(error.response?.data?.message || 'Failed to load system data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const user = await login(email, password);
      if (user.role !== 'admin') {
        toast.error('Unauthorized access.');
        return;
      }
      toast.success('Authentication Successful.');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleStatusUpdate = async (vendorId, status) => {
    try {
      await api.post('/admin/update-status', { vendorId, status });
      toast.success(`Vendor status updated to ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/admin/notifications/${id}/read`);
      fetchData();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await api.delete(`/admin/notifications/${id}`);
      fetchData();
      toast.success('Notification removed');
    } catch (error) {
      toast.error('Failed to remove notification');
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm('Delete this vendor?')) return;
    try {
      await api.delete(`/admin/vendor/${vendorId}`);
      toast.success('Vendor deleted');
      fetchData();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  if (loading) return <Loader variant="admin" />;

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 font-serif relative overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px]"></div>
        <div className="bg-white rounded-[32px] w-full max-w-[440px] p-8 relative z-10 border border-slate-100" style={{ boxShadow: '0 40px 120px rgba(15,23,42,0.1)' }}>
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-slate-900/20">
               <Shield className="text-white" size={22} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-1">
               Authority <span className="text-slate-400">Portal</span>
            </h1>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Identity Key</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                   <Mail size={16} />
                </div>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all text-sm" placeholder="Enter Identity" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Security Access Key</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                   <Lock size={16} />
                </div>
                <input type={showPassword ? "text" : "password"} className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-11 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all text-sm" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginLoading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 mt-2 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3">
              {loginLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRightIcon size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredVendors = data.vendors.filter(v => {
    const matchesSearch = v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Suspended': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-6 z-50">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20" style={{ background: 'linear-gradient(to top right, #0F172A, #334155)' }}>
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tighter">SHAADI<span className="text-slate-500">HUB</span></h2>
              <p className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase">Executive Suite</p>
            </div>
          </div>
          <nav className="space-y-2 flex-1">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'vendors', icon: Store, label: 'Vendors' },
              { id: 'users', icon: Users, label: 'Customers' },
              { id: 'reports', icon: AlertCircle, label: 'Reports' },
              { id: 'inquiries', icon: MessageSquare, label: 'Inquiries' },
              { id: 'alerts', icon: Bell, label: 'Alerts' },
              { id: 'categories', icon: Filter, label: 'Categories' }
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 group ${activeTab === item.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/30 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <item.icon size={20} />
                <span className="tracking-tight text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={() => { logout(); navigate('/'); }} className="mt-auto w-full flex items-center gap-3 px-5 py-3 text-slate-400 hover:text-rose-500 transition-colors text-sm font-medium">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto p-10 relative bg-white">
          <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                {activeTab === 'overview' ? 'Command Overview' : activeTab === 'vendors' ? 'Vendor Registry' : activeTab === 'users' ? 'User Base' : 'Booking Log'}
              </h1>
              <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">Live System Feed</p>
            </motion.div>
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button 
                onClick={() => setActiveTab('alerts')}
                className="relative p-3.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <Bell size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center border-2 border-white shadow-lg shadow-rose-500/20">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input type="text" placeholder="Global search..." className="bg-white border border-slate-100 rounded-xl pl-12 pr-6 py-3.5 w-72 text-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all text-sm font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                  {[
                    { label: 'Revenue', val: `₹${(data.stats?.totalRevenue || 0).toLocaleString()}`, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Users', val: data.stats?.totalUsers || 0, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Vendors', val: data.stats?.totalVendors || 0, icon: Store, color: 'text-violet-600', bg: 'bg-violet-50' },
                    { label: 'Bookings', val: data.stats?.totalBookings || 0, icon: Calendar, color: 'text-slate-600', bg: 'bg-slate-50' },
                    { label: 'Pending', val: data.stats?.pendingVendors || 0, icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Active', val: data.stats?.activeVendors || 0, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' }
                  ].map((s, i) => (
                    <div key={i} className="group bg-white p-5 rounded-2xl shadow-sm border border-white hover:border-slate-100 transition-all duration-300">
                      <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-4`}><s.icon size={18} /></div>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-1">{s.label}</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{s.val}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'vendors' && (
              <motion.div key="vendors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                      <button key={status} onClick={() => setStatusFilter(status)} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === status ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{status}</button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                        <th className="px-8 py-5">Vendor Profile</th>
                        <th className="px-8 py-5">Category</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredVendors.map((vendor) => (
                        <tr key={vendor._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center text-slate-900 font-black">{vendor.businessName[0]}</div>
                              <div><p className="font-bold text-slate-900 text-sm">{vendor.businessName}</p><p className="text-[10px] text-slate-400 font-medium">{vendor.user?.email}</p></div>
                            </div>
                          </td>
                          <td className="px-8 py-6"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">{vendor.category}</span></td>
                          <td className="px-8 py-6"><div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(vendor.status)}`}>{vendor.status}</div></td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {vendor.status !== 'Approved' && <button onClick={() => handleStatusUpdate(vendor._id, 'Approved')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Check size={18} /></button>}
                              <button onClick={() => handleDeleteVendor(vendor._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'alerts' && (
              <motion.div key="alerts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {notifications.map(n => (
                  <div 
                    key={n._id} 
                    className={`p-6 rounded-[28px] border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                      n.isRead 
                        ? 'bg-white border-slate-100 shadow-sm' 
                        : 'bg-white border-slate-900/5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-5 flex-1">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                        n.type === 'NEW_VENDOR' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 
                        n.type === 'NEW_REPORT' ? 'bg-rose-50 text-rose-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {n.type === 'NEW_VENDOR' ? <Store size={26} /> : 
                         n.type === 'NEW_REPORT' ? <AlertCircle size={26} /> :
                         <Bell size={26} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-slate-900 tracking-tight">{n.title}</h4>
                          {!n.isRead && <span className="w-2 h-2 bg-rose-500 rounded-full"></span>}
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{new Date(n.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {n.type === 'NEW_VENDOR' && n.relatedId && (
                        <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-xl mr-2">
                          <button 
                            onClick={() => handleStatusUpdate(n.relatedId, 'Approved')}
                            className="px-4 py-2 bg-white text-emerald-600 text-[10px] font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm uppercase tracking-widest"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(n.relatedId, 'Pending')}
                            className="px-4 py-2 bg-white text-amber-600 text-[10px] font-bold rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm uppercase tracking-widest"
                          >
                            Pending
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(n.relatedId, 'Rejected')}
                            className="px-4 py-2 bg-white text-rose-600 text-[10px] font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm uppercase tracking-widest"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {!n.isRead && (
                        <button 
                          onClick={() => handleMarkRead(n._id)} 
                          className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                          title="Mark as Read"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteNotification(n._id)} 
                        className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                        title="Delete Notification"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div key="reports" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">System Reports</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <tr>
                        <th className="px-8 py-5">Reporter</th>
                        <th className="px-8 py-5">Vendor Reported</th>
                        <th className="px-8 py-5">Reason</th>
                        <th className="px-8 py-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {reports.map((report) => (
                        <tr key={report._id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Users size={18} />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-sm tracking-tight">{report.reporter?.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{report.reporter?.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md">
                                <Store size={18} />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-sm tracking-tight">{report.vendor?.businessName}</p>
                                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{report.vendor?.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100 w-fit">
                                <AlertCircle size={12} /> {report.reason}
                              </span>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-xs italic line-clamp-2">"{report.description}"</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                               report.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                             }`}>
                               {report.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                      {reports.length === 0 && <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No active reports</td></tr>}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div key="inquiries" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Marketplace Inquiries</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <tr>
                        <th className="px-8 py-5">Customer</th>
                        <th className="px-8 py-5">Vendor</th>
                        <th className="px-8 py-5">Inquiry Details</th>
                        <th className="px-8 py-5 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry._id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Users size={18} />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-sm tracking-tight">{inquiry.user?.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{inquiry.user?.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md">
                                <Store size={18} />
                              </div>
                              <p className="font-black text-slate-900 text-sm tracking-tight">{inquiry.vendor?.businessName}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl max-w-md">
                              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">"{inquiry.message}"</p>
                              <div className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
                                  <CreditCard size={10} /> ₹{inquiry.budget}
                                </span>
                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                                  <Shield size={10} /> {inquiry.city || 'N/A'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="inline-flex flex-col items-end">
                              <p className="text-[10px] text-slate-900 font-black uppercase tracking-tighter">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">Submitted</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {inquiries.length === 0 && <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No inquiries found</td></tr>}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
