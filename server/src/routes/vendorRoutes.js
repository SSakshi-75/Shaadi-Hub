import express from 'express';
import { createOrUpdateVendorProfile, getMyVendorProfile, getAllVendors, getVendorById } from '../controllers/vendorController.js';
import { createReport } from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getAllVendors);
router.get('/me', protect, authorize('vendor'), getMyVendorProfile);
router.get('/:id', getVendorById);
router.post('/report', protect, createReport);
router.post('/', protect, authorize('user', 'vendor'), upload.array('gallery', 10), createOrUpdateVendorProfile);

export default router;
