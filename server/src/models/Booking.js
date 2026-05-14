import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  advancePaid: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending',
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
