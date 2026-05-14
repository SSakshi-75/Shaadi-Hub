import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import { ArrowRight, Store } from 'lucide-react';
import toast from 'react-hot-toast';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vendor'
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      toast.success('Vendor account created! Please complete your profile.');
      navigate('/become-vendor');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-cream">
      <SEO
        title="Vendor Registration | ShaadiHub"
        description="Join ShaadiHub as a vendor and grow your wedding business."
      />
      <Navbar dark={true} />

      <div className="flex items-center justify-center pt-32 pb-12 px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row-reverse border border-gray-100">

          {/* Right Side - Royal Purple Banner */}
          <div
            className="md:w-5/12 p-10 text-white flex flex-col justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #52339A 0%, #6C4AB6 100%)' }}
          >
            {/* Elegant Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent opacity-40 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                  <Store size={32} className="text-white" />
                </div>
                <p className="text-white font-black uppercase mb-2 tracking-[0.2em]" style={{ fontSize: '11px' }}>Join ShaadiHub today</p>
                <h1 className="text-4xl font-serif font-bold mb-4 leading-tight">Vendor Portal</h1>
                <p className="text-white/80 text-base leading-relaxed font-light max-w-xs">
                  Manage your business, bookings, and reach thousands of couples effortlessly.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                {[
                  'Booking management',
                  'Portfolio showcase',
                  'Client connection'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-white/30 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium tracking-wide text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Abstract Shapes */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-30"></div>
          </div>

          {/* Left Side - Form Section */}
          <div className="md:w-7/12 p-10 lg:p-12">
            <div className="mb-12 flex justify-between items-center gap-10">
              <div className="flex items-center justify-between mb-8 p-1 bg-gray-50 rounded-2xl w-fit">
                <Link to="/signup" className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">Customer</Link>
                <div className="px-8 py-2.5 bg-white text-royal-purple rounded-xl shadow-sm font-black text-sm border border-gray-100">Vendor</div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-dark-text whitespace-nowrap">Create Account</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-black text-gray-500 uppercase mb-3 ml-1" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>Owner Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-royal-purple/5 focus:border-royal-purple transition-all outline-none text-sm font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-black text-gray-500 uppercase mb-3 ml-1" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>Business Email</label>
                <input
                  type="email"
                  placeholder="business@shaadihub.com"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-royal-purple/5 focus:border-royal-purple transition-all outline-none text-sm font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-black text-gray-500 uppercase mb-3 ml-1" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-royal-purple/5 focus:border-royal-purple transition-all outline-none text-sm font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-royal-purple hover:bg-deep-purple text-white font-black py-4 rounded-2xl shadow-xl shadow-royal-purple/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-6 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="tracking-tight">Create Vendor Account</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
              <p className="text-gray-400 text-xs font-medium">Already have an account?
                <Link to="/vendor-login" className="text-royal-purple font-black ml-2 hover:underline transition-all">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
