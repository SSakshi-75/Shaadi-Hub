import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Store, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') === 'vendor' ? 'vendor' : 'user';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: initialRole
  });

  // Aggressive clear to prevent browser from pre-filling admin data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData(prev => ({ ...prev, email: '', password: '' }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userData = await googleLogin(tokenResponse.access_token, formData.role);
        toast.success(`Welcome back, ${userData.name}!`);
        if (userData.role === 'admin') navigate('/admin-dashboard');
        else if (userData.role === 'vendor') navigate('/vendor-dashboard');
        else navigate('/');
      } catch (err) {
        toast.error('Google Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      toast.success('Login successful!');
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'vendor') navigate('/vendor-dashboard');
      else navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'user',
      label: 'Customer',
      icon: <User size={18} />,
      title: 'Welcome Back',
      desc: 'Access your wedding planning tools and saved vendors.',
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
      desc: 'Manage your business, bookings, and analytics.',
      colorClass: 'bg-royal-purple',
      textClass: 'text-royal-purple',
      ringClass: 'focus:ring-royal-purple',
      btnClass: 'bg-royal-purple shadow-royal-purple/20 hover:bg-deep-purple'
    }
  ];

  const currentRoleInfo = roles.find(r => r.id === formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-cream py-4 px-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

        {/* Left Side - Dynamic Info */}
        <div className={`md:w-5/12 p-10 text-white flex flex-col justify-center transition-all duration-700 relative overflow-hidden ${currentRoleInfo.colorClass}`}>
          {/* Subtle overlay glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
              {currentRoleInfo.icon}
            </div>
            <p className="text-white font-black uppercase mb-2 tracking-[0.2em]" style={{ fontSize: '11px' }}>Welcome back to ShaadiHub</p>
            <h2 className="text-4xl font-bold font-serif mb-4 leading-tight">{currentRoleInfo.title}</h2>
            <p className="text-white/80 text-base leading-relaxed font-light max-w-xs">
              {currentRoleInfo.desc}
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-6 lg:p-10">
          <div className="mb-8 flex justify-between items-center gap-10">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-dark-text whitespace-nowrap">Sign In</h1>
            </div>

            {/* Role Switcher */}
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

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Hidden dummy fields to capture browser autofill */}
            <input type="text" name="sh_anti_autofill_e" className="hidden" />
            <input type="password" name="sh_anti_autofill_p" className="hidden" />

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-dark-text transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="sh_login_identity_id"
                  autoComplete="new-password"
                  className={`w-full px-12 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 ${currentRoleInfo.ringClass} focus:ring-opacity-10 focus:border-transparent transition-all outline-none text-sm font-medium`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-2 ml-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-dark-text transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="sh_login_secure_token"
                  autoComplete="new-password"
                  className={`w-full px-12 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 ${currentRoleInfo.ringClass} focus:ring-opacity-10 focus:border-transparent transition-all outline-none text-sm font-medium`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-2 mr-1">
                <button type="button" className={`text-xs font-bold ${currentRoleInfo.textClass} hover:underline uppercase tracking-widest`} style={{ fontSize: '10px' }}>Forgot Password?</button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-black py-3 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-2 text-sm ${currentRoleInfo.btnClass}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In to Account</>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or login with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={loading}
              className="mt-6 w-full bg-white border border-gray-100 text-dark-text font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all hover:border-gray-200 text-sm shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className={`${currentRoleInfo.textClass} hover:underline font-black`}>
              Join ShaadiHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
