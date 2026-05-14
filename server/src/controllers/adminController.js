import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Booking from '../models/Booking.js';
import Category from '../models/Category.js';
import Inquiry from '../models/Inquiry.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const pendingVendors = await Vendor.countDocuments({ status: 'Pending' });
    const activeVendors = await Vendor.countDocuments({ status: 'Approved' });
    const totalBookings = await Booking.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const totalReports = await Inquiry.countDocuments(); // Placeholder for actual report count if needed
    
    const revenueRes = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalUsers,
      totalVendors,
      pendingVendors,
      activeVendors,
      totalBookings,
      totalInquiries,
      totalRevenue: revenueRes[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVendorsAdmin = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('user', 'name email');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVendorStatus = async (req, res) => {
  try {
    const { vendorId, status } = req.body;
    
    // 1. Get current vendor status
    const currentVendor = await Vendor.findById(vendorId);
    if (!currentVendor) return res.status(404).json({ message: 'Vendor not found' });

    // 2. Only proceed if status is actually changing
    if (currentVendor.status === status) {
      return res.json(currentVendor);
    }

    const isApproved = status === 'Approved';
    const vendor = await Vendor.findByIdAndUpdate(
      vendorId, 
      { status, isApproved }, 
      { new: true }
    ).populate('user');

    if (vendor) {
      const title = `Profile ${status}`;
      
      // 3. Check if an identical notification already exists to prevent duplicates
      const existingNotif = await Notification.findOne({
        recipient: vendor.user._id,
        relatedId: vendor._id,
        title: title
      });

      if (!existingNotif) {
        await Notification.create({
          type: 'SYSTEM_ALERT',
          title: title,
          message: status === 'Approved' 
            ? 'Congratulations! Your vendor profile has been approved and is now live.' 
            : `Your vendor profile status has been updated to ${status}.`,
          relatedId: vendor._id,
          recipient: vendor.user._id
        });
      }
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFeaturedVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);
    vendor.isFeatured = !vendor.isFeatured;
    await vendor.save();
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVendorAdmin = async (req, res) => {
  try {
    const { vendorId } = req.params;
    await Vendor.findByIdAndDelete(vendorId);
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const blockUserAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.status = user.status === 'blocked' ? 'active' : 'blocked';
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInquiriesAdmin = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('user', 'name email')
      .populate('vendor', 'businessName')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('vendor', 'businessName')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReviewAdmin = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCategoryAdmin = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryAdmin = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotificationsAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: null }).sort({ createdAt: -1 }).limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationReadAdmin = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotificationAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
