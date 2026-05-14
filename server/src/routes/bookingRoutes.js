import express from 'express';
import { createBooking, getMyBookings, getVendorBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/vendor', protect, authorize('vendor'), getVendorBookings);
router.put('/status', protect, authorize('vendor'), updateBookingStatus);

export default router;
