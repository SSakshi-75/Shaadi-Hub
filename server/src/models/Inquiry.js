import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
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
  budget: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending',
  },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
