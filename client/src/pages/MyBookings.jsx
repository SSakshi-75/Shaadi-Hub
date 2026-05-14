import { useState, useEffect } from 'react';
import api from '../services/api';
import { CreditCard, Calendar, CheckCircle, Clock } from 'lucide-react';

import Loader from '../components/Loader';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    
    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (booking) => {
    try {
      // 1. Create Order
      const { data: order } = await api.post('/payments/order', { bookingId: booking._id });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'your_key_id',
        amount: order.amount,
        currency: order.currency,
        name: "ShaadiHub",
        description: `Booking for ${booking.vendor.businessName}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', {
              ...response,
              bookingId: booking._id
            });
            alert('Payment successful!');
            fetchBookings(); // Refresh
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: "", // Can add user details from context
          email: "",
        },
        theme: {
          color: "#E91E63",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Error initiating payment');
    }
  };

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-text mb-8 text-center">My Bookings</h1>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    booking.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                  {booking.paymentStatus === 'paid' && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle size={10} /> Paid
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-dark-text">{booking.vendor.businessName}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </div>
                  <div className="font-bold text-primary-pink">
                    ₹{booking.totalAmount}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {booking.status === 'accepted' && booking.paymentStatus === 'pending' && (
                  <button 
                    onClick={() => handlePayment(booking)}
                    className="btn-primary flex items-center gap-2 px-6"
                  >
                    <CreditCard size={18} />
                    Pay Advance
                  </button>
                )}
                {booking.status === 'pending' && (
                  <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
                    <Clock size={18} />
                    Awaiting Vendor Approval
                  </div>
                )}
                {booking.paymentStatus === 'paid' && (
                  <button className="btn-secondary px-6">View Invoice</button>
                )}
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
              <p className="text-gray-500">You haven't booked any vendors yet.</p>
              <a href="/vendors" className="text-primary-pink font-bold mt-4 inline-block">Browse Vendors</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
