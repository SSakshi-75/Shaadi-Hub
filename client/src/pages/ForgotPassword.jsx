import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-cream py-8 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary-pink" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-dark-text">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-2">No worries, we'll send you reset instructions.</p>
        </div>

        {message ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-medium border border-green-100">
              <CheckCircle2 size={20} />
              <p>{message}</p>
            </div>
            <Link to="/login" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
              <ArrowLeft size={18} />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="enter your email"
                  className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all outline-none text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-lg bg-primary-pink shadow-primary-pink/20 hover:bg-deep-pink disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary-pink hover:underline font-bold">
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
