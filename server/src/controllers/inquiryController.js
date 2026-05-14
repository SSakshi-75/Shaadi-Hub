import Inquiry from '../models/Inquiry.js';
import Vendor from '../models/Vendor.js';
import sendEmail from '../utils/sendEmail.js';

export const createInquiry = async (req, res) => {
  try {
    const { vendorId, eventDate, budget, message, city } = req.body;

    const vendor = await Vendor.findById(vendorId).populate('user', 'email name');
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const inquiry = await Inquiry.create({
      user: req.user._id,
      vendor: vendorId,
      eventDate,
      budget,
      message,
      city,
    });

    // Send email notification to vendor
    const emailOptions = {
      email: vendor.user.email,
      subject: `New Inquiry for ${vendor.businessName} on ShaadiHub`,
      message: `You have a new inquiry from ${req.user.name}!\n\nCity: ${city}\nEvent Date: ${eventDate}\nBudget: ${budget}\nMessage: ${message}\n\nPlease log in to your dashboard to respond.`,
    };

    try {
      await sendEmail(emailOptions);
    } catch (error) {
      console.error('Error sending inquiry email', error);
      // We still return 201 because the inquiry was saved
    }

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id }).populate('vendor', 'businessName');
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorInquiries = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const inquiries = await Inquiry.find({ vendor: vendor._id }).populate('user', 'name email');
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
