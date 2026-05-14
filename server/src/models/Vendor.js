import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Lehenga', 'Makeup', 'Photographer', 'DJ', 'Decoration', 'Mehendi', 'Caterer', 'Wedding Planner'],
  },
  pricing: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gallery: [{
    type: String, // URLs from Cloudinary
  }],
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  instagram: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Suspended'],
    default: 'Pending',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
