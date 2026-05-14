import Booking from '../models/Booking.js';
import Vendor from '../models/Vendor.js';

export const createBooking = async (req, res) => {
  try {
    const { vendorId, eventDate, totalAmount } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      vendor: vendorId,
      eventDate,
      totalAmount,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('vendor', 'businessName');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const bookings = await Booking.find({ vendor: vendor._id }).populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    
    const booking = await Booking.findById(bookingId).populate('vendor');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the current user is the vendor for this booking
    if (booking.vendor.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
