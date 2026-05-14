import express from 'express';
import { 
  getAdminStats, 
  getAllVendorsAdmin, 
  updateVendorStatus, 
  getAllUsersAdmin,
  toggleFeaturedVendor,
  deleteVendorAdmin,
  blockUserAdmin,
  getAllInquiriesAdmin,
  getAllReviewsAdmin,
  deleteReviewAdmin,
  getCategoriesAdmin,
  addCategoryAdmin,
  deleteCategoryAdmin,
  getNotificationsAdmin,
  markNotificationReadAdmin,
  deleteNotificationAdmin
} from '../controllers/adminController.js';
import { getAllReportsAdmin, updateReportStatusAdmin } from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/vendors', getAllVendorsAdmin);
router.post('/update-status', updateVendorStatus);
router.patch('/toggle-featured/:vendorId', toggleFeaturedVendor);
router.delete('/vendor/:vendorId', deleteVendorAdmin);
router.get('/users', getAllUsersAdmin);
router.post('/block-user', blockUserAdmin);
router.get('/reports', getAllReportsAdmin);
router.post('/update-report', updateReportStatusAdmin);
router.get('/inquiries', getAllInquiriesAdmin);
router.get('/reviews', getAllReviewsAdmin);
router.delete('/review/:reviewId', deleteReviewAdmin);
router.get('/categories', getCategoriesAdmin);
router.post('/categories', addCategoryAdmin);
router.delete('/category/:categoryId', deleteCategoryAdmin);

router.get('/notifications', getNotificationsAdmin);
router.patch('/notifications/:notificationId/read', markNotificationReadAdmin);
router.delete('/notifications/:id', deleteNotificationAdmin);

export default router;
