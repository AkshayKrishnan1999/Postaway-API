import express from 'express';
import CommentController from './comment.controller.js'; 
import authMiddleware from '../../middlewares/auth.middleware.js'; // Assuming authentication

const router = express.Router();
const commentController = new CommentController();

// Comment Routes (Assuming `router.post('/:postId/comments', authMiddleware, commentController.createComment); /api/posts` for post-related logic)

router.get('/:postId/comments', commentController.getCommentsByPost);
router.put('/:postId/comments/:id', authMiddleware, commentController.updateComment); 
router.delete('/:postId/comments/:id', authMiddleware, commentController.deleteComment);

export default router;
