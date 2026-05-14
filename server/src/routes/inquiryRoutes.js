import express from 'express';
import { createInquiry, getMyInquiries, getVendorInquiries } from '../controllers/inquiryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createInquiry);
router.get('/my', protect, getMyInquiries);
router.get('/vendor', protect, authorize('vendor'), getVendorInquiries);

export default router;
