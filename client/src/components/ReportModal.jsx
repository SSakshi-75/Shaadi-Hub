import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ShieldAlert, Bug, UserX } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ReportModal = ({ isOpen, onClose, vendorId, vendorName }) => {
  const [reason, setReason] = useState('Fake vendor');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { id: 'Fake vendor', label: 'Fake Vendor', icon: UserX },
    { id: 'Scam activity', label: 'Scam Activity', icon: ShieldAlert },
    { id: 'Abuse', label: 'Abuse/Harassment', icon: AlertTriangle },
    { id: 'Fraud', label: 'Fraud/Other', icon: Bug },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/reports', {
        vendorId,
        reason,
        description
      });
      toast.success('Report submitted successfully. Admin will review it.');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-[32px] overflow-hidden relative z-10 shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-slate-900">Report Vendor</h3>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-slate-500 text-sm mb-8">
                Reporting <span className="font-bold text-slate-900">{vendorName}</span>. 
                Please select a reason for your report.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setReason(type.id)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        reason === type.id 
                        ? 'border-rose-500 bg-rose-50 text-rose-600' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <type.icon size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Additional Details</label>
                  <textarea
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-rose-500/20 transition-all"
                    rows="3"
                    placeholder="Describe the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 text-slate-500 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-500/20 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
