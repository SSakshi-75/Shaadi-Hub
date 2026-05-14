import Report from '../models/Report.js';
import Vendor from '../models/Vendor.js';
import Notification from '../models/Notification.js';

export const createReport = async (req, res) => {
  try {
    const { vendorId, reason, description } = req.body;
    
    const report = await Report.create({
      reporter: req.user._id,
      vendor: vendorId,
      reason,
      description
    });

    const vendor = await Vendor.findById(vendorId);

    // Notify Admin
    await Notification.create({
      type: 'NEW_REPORT',
      title: 'New Vendor Report',
      message: `A report has been filed against ${vendor?.businessName || 'a vendor'} for ${reason}.`,
      relatedId: report._id,
      recipient: null // Admin
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Create Report Error:', error);
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

export const getAllReportsAdmin = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'name email')
      .populate('vendor', 'businessName category status')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

export const updateReportStatusAdmin = async (req, res) => {
  try {
    const { reportId, status } = req.body;
    const report = await Report.findByIdAndUpdate(reportId, { status }, { new: true });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report status' });
  }
};
