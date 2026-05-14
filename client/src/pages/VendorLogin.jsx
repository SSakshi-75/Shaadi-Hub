import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import { Lock, Mail, ArrowRight, Store, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'vendor') {
        toast.success('Welcome back to your dashboard!');
        navigate('/vendor-dashboard');
      } else {
        toast.error('This portal is for vendors only.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-cream">
      <SEO
        title="Vendor Login | ShaadiHub"
        description="Access your vendor dashboard to manage your wedding business."
      />
      <Navbar dark={true} />

      <div className="flex items-center justify-center pt-24 pb-12 px-4">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row border border-gray-100">

          {/* Left Side - Royal Purple Banner */}
          <div
            className="md:w-5/12 p-10 text-white flex flex-col justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #52339A 0%, #6C4AB6 100%)' }}
          >
            {/* Elegant Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-40"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                  <Store size={28} className="text-white" />
                </div>
                <p className="text-white font-black uppercase mb-2 tracking-[0.2em]" style={{ fontSize: '11px' }}>Professional Suite</p>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">Vendor Portal</h1>
                <p className="text-white/80 text-base leading-relaxed font-light max-w-xs">
                  Welcome back. Access your professional suite and manage your bookings effortlessly.
                </p>
              </div>
              
              <div className="p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm inline-block w-fit">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Marketplace Active</span>
                </div>
                <p className="text-[10px] text-white/60 font-medium leading-relaxed">Your services are live to thousands of couples.</p>
              </div>
            </div>
            
            {/* Abstract Shapes */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Right Side - Login Form */}
          <div className="md:w-7/12 p-8 lg:p-10">
            <div className="mb-12 flex justify-between items-center gap-10">
              <div className="flex items-center justify-between mb-8 p-1 bg-gray-50 rounded-2xl w-fit">
                <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">Customer</Link>
                <div className="px-8 py-2.5 bg-white text-royal-purple rounded-xl shadow-sm font-black text-sm border border-gray-100">Vendor</div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-dark-text whitespace-nowrap">Login</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              {/* Dummy fields to trick browser autofill */}
              <input type="text" name="v_email_fake" className="hidden" autoComplete="off" />
              <input type="password" name="v_pass_fake" className="hidden" autoComplete="off" />

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Identity Key (Email)</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-royal-purple transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    autoComplete="new-password"
                    placeholder="name@business.com"
                    className="w-full px-12 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-royal-purple/5 focus:border-royal-purple transition-all outline-none text-sm font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-3 ml-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Security Key</label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-royal-purple transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-12 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-royal-purple/5 focus:border-royal-purple transition-all outline-none text-sm font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-royal-purple transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2 mr-1">
                  <button type="button" className="text-[10px] font-bold text-royal-purple uppercase tracking-widest hover:underline">Forgot Password?</button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-royal-purple hover:bg-deep-purple text-white font-black py-3 rounded-2xl shadow-xl shadow-royal-purple/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="tracking-tight">Sign In to Portal</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
              <p className="text-gray-400 text-xs font-medium">New to ShaadiHub?
                <Link to="/vendor-signup" className="text-royal-purple font-black ml-2 hover:underline transition-all">Join as Vendor</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
