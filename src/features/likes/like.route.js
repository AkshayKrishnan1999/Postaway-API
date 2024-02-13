import express from 'express';
import LikeController from './like.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js'; // Assuming you have authentication 

const router = express.Router();
const likeController = new LikeController();

// Like Routes
router.get('/:postId/likes', likeController.getLikesByPost);
router.post('/:postId/likes', authMiddleware, likeController.toggleLike); // Could also use PUT

export default router;
