import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js'; 
import authMiddleware from '../../middlewares/auth.middleware.js'// Hypothetical authentication middleware

const router = express.Router(); 
const postController = new PostController();

// POST Routes (Assuming 'api/posts' as the base path)
router.post('/', postController.createPost); 
router.get('/', postController.getAllPosts); 
router.get('/:userId', postController.getPostsByUser);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);  
router.delete('/:id', authMiddleware, postController.deletePost); 




export default router;
