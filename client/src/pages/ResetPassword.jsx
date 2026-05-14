import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    setLoading(true);
    try {
      const { data } = await api.put(`/auth/reset-password/${resetToken}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-cream py-8 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-pink" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-dark-text">Set New Password</h2>
          <p className="text-gray-500 text-sm mt-2">Your new password must be different from previous passwords.</p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 rounded-2xl flex items-center gap-3 text-green-700 text-sm font-medium border border-green-100">
              <CheckCircle2 size={20} />
              <p>Password reset successful! Redirecting to login...</p>
            </div>
            <Link to="/login" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
              <span>Login Now</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all outline-none text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all outline-none text-base"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                'Reset Password'
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

export default ResetPassword;
