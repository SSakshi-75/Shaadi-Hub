import express from 'express';
import { getMyNotifications, markMyNotificationRead, deleteMyNotification } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/my', getMyNotifications);
router.patch('/:id/read', markMyNotificationRead);
router.delete('/:id', deleteMyNotification);

export default router;
