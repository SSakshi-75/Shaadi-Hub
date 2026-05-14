import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

export const createRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: booking.totalAmount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      const booking = await Booking.findById(bookingId);
      booking.paymentStatus = 'paid';
      booking.advancePaid = booking.totalAmount; // For simplicity, full payment
      await booking.save();
      
      res.json({ message: 'Payment verified successfully', booking });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
