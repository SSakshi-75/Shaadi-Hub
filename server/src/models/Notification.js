import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['NEW_VENDOR', 'NEW_INQUIRY', 'NEW_REPORT', 'SYSTEM_ALERT'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // If null, it's for admin
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
