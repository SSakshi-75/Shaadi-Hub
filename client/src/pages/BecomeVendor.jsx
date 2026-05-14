import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Upload, X, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const BecomeVendor = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Lehenga',
    location: '',
    pricing: '',
    description: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    availability: true,
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      images.forEach(image => data.append('gallery', image));

      await api.post('/vendors', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Registration Complete! Your profile is now under Admin Review.');
      navigate('/vendor-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to onboard');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-soft-cream py-12 px-4">
      <Navbar dark={true} />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-16">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-[#6C4AB6] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > num ? <CheckCircle size={20} /> : num}
              </div>
              {num < 3 && <div className={`w-16 h-1 ${step > num ? 'bg-[#6C4AB6]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-dark-text">Business Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {['Lehenga', 'Makeup', 'Photographer', 'DJ', 'Decoration', 'Mehendi', 'Caterer', 'Wedding Planner'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City / Location</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <button onClick={nextStep} className="w-full bg-[#6C4AB6] text-white py-3 rounded-md font-bold hover:bg-[#52339a] transition-all">Next Step</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-dark-text">Service & Pricing</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Starting Price (₹)</label>
              <input
                type="number"
                placeholder="E.g. 20000"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.pricing}
                onChange={(e) => setFormData({...formData, pricing: e.target.value})}
              />
            </div>
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="availability"
                className="w-4 h-4 text-[#6C4AB6] focus:ring-[#6C4AB6] border-gray-300 rounded"
                checked={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.checked})}
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                Currently Available for Bookings
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  placeholder="10 digit number"
                  maxLength="10"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setFormData({...formData, phone: value});
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">WhatsApp (Optional)</label>
                <input
                  type="text"
                  placeholder="10 digit number"
                  maxLength="10"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setFormData({...formData, whatsapp: value});
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram Profile Link (Optional)</label>
              <input
                type="text"
                placeholder="https://instagram.com/..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#6C4AB6] focus:border-[#6C4AB6]"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="w-1/2 border-2 border-[#6C4AB6] text-[#6C4AB6] py-3 rounded-md font-bold hover:bg-purple-50 transition-all">Back</button>
              <button onClick={nextStep} className="w-1/2 bg-[#6C4AB6] text-white py-3 rounded-md font-bold hover:bg-[#52339a] transition-all">Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-dark-text">Portfolio Gallery</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#6C4AB6] transition-colors relative">
              <input
                type="file"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <Upload className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500">Click or drag images to upload</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {previews.map((src, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={src} className="w-full h-full object-cover rounded-lg" alt="preview" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={prevStep} className="w-1/2 border-2 border-[#6C4AB6] text-[#6C4AB6] py-3 rounded-md font-bold hover:bg-purple-50 transition-all">Back</button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-1/2 bg-[#6C4AB6] text-white py-3 rounded-md font-bold hover:bg-[#52339a] transition-all flex items-center justify-center min-h-[50px]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Finish Onboarding'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BecomeVendor;
