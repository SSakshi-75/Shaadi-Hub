import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Store, CheckCircle2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const Signup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') === 'vendor' ? 'vendor' : 'user';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: initialRole
  });

  // Aggressive clear to prevent browser from pre-filling admin data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData(prev => ({ ...prev, name: '', email: '', password: '' }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const roleFromQuery = queryParams.get('role');
    if (roleFromQuery === 'vendor' || roleFromQuery === 'user') {
      setFormData(prev => ({ ...prev, role: roleFromQuery }));
    }
  }, [location.search]);

  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userData = await googleLogin(tokenResponse.access_token, formData.role);
        toast.success(`Account created successfully! Welcome ${userData.name}`);
        if (userData.role === 'vendor') {
          navigate('/become-vendor');
        } else {
          navigate('/');
        }
      } catch (err) {
        toast.error('Google Signup failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      toast.success('Registration successful!');
      if (formData.role === 'vendor') {
        navigate('/become-vendor');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'user',
      label: 'Customer',
      icon: <User size={18} />,
      title: 'Plan Your Wedding',
      desc: 'Find the best vendors and manage your dream wedding journey.',
      processes: ['Browse top vendors', 'Get free quotes', 'Manage bookings'],
      colorClass: 'bg-primary-pink',
      textClass: 'text-primary-pink',
      ringClass: 'focus:ring-primary-pink',
      btnClass: 'bg-primary-pink shadow-primary-pink/20 hover:bg-deep-pink'
    },
    {
      id: 'vendor',
      label: 'Vendor',
      icon: <Store size={18} />,
      title: 'Vendor Portal',
      desc: 'Manage your business, bookings, and reach thousands of couples.',
      processes: ['Booking management', 'Portfolio showcase', 'Client connection'],
      colorClass: 'bg-royal-purple',
      textClass: 'text-royal-purple',
      ringClass: 'focus:ring-royal-purple',
      btnClass: 'bg-royal-purple shadow-royal-purple/20 hover:bg-deep-purple'
    }
  ];

  const currentRoleInfo = roles.find(r => r.id === formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-cream py-6 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

        {/* Left Side - Dynamic Info */}
        <div className={`md:w-5/12 p-10 text-white flex flex-col justify-center transition-all duration-700 relative overflow-hidden ${currentRoleInfo.colorClass}`}>
          {/* Abstract background subtle glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col gap-8">
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                {currentRoleInfo.icon}
              </div>
              <p className="text-white font-black uppercase mb-2 tracking-[0.2em]" style={{ fontSize: '11px' }}>Join ShaadiHub today</p>
              <h2 className="text-4xl font-bold font-serif mb-4 leading-tight">{currentRoleInfo.title}</h2>
              <p className="text-white/80 text-base leading-relaxed font-light max-w-xs">
                {currentRoleInfo.desc}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              {currentRoleInfo.processes.map((p, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-white/30 transition-all duration-300">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium tracking-wide text-white/90">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-6 md:p-8">
          <div className="mb-8 flex justify-between items-center gap-10">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-dark-text whitespace-nowrap">Create Account</h1>
            </div>

            {/* Compact Role Switcher */}
            <div className="flex bg-gray-100 p-1.5 rounded-xl">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${formData.role === r.id ? `bg-white ${r.textClass} shadow-sm` : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
            {/* Hidden dummy fields to capture browser autofill */}
            <input type="text" name="prevent_autofill_email" className="hidden" />
            <input type="password" name="prevent_autofill_password" className="hidden" />

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                {formData.role === 'vendor' ? 'Owner Full Name' : 'Full Name'}
              </label>
              <input
                type="text"
                name="sh_full_name_field"
                autoComplete="new-password"
                className={`w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 ${currentRoleInfo.ringClass} focus:border-transparent transition-all outline-none text-base`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                {formData.role === 'vendor' ? 'Business Email' : 'Email Address'}
              </label>
              <input
                type="email"
                name="sh_user_identity_email"
                autoComplete="new-password"
                className={`w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 ${currentRoleInfo.ringClass} focus:border-transparent transition-all outline-none text-base`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Password</label>
              <input
                type="password"
                name="sh_user_secure_key"
                autoComplete="new-password"
                className={`w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 ${currentRoleInfo.ringClass} focus:border-transparent transition-all outline-none text-base`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 mt-2 text-lg ${currentRoleInfo.btnClass}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                formData.role === 'vendor' ? 'Create Vendor Account' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={loading}
              className="mt-4 w-full bg-white border border-gray-100 text-dark-text font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all hover:border-gray-200 text-base shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className={`${currentRoleInfo.textClass} hover:underline font-bold`}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
