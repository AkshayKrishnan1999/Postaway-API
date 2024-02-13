import PostModel from './post.model.js';
import { ApplicationError } from '../../error-handler/applicationError.js';

export default class PostController {
  async createPost(req, res, next) {
    try {
      const { content } = req.body;
      const newPost = PostModel.create(
        content,
        req.file ? req.file.filename : undefined,
        req.user.id
      );
      res.status(201).send(newPost);
    } catch (err) {
      next(err);
    }
  }

  async getAllPosts(req, res, next) { 
    try {
      res.status(200).send(PostModel.getAll());
    } catch (err) {
      next(err);
    }
  }

  async getPostsByUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const userPosts = PostModel.getByAuthor(userId);
      res.status(200).send(userPosts);
    } catch (err) {
      next(err);
    }
  }

  async getPostById(req, res, next) {
    try {
      const postId = parseInt(req.params.id); 
      const post = PostModel.getById(postId);

      if (!post) {
        throw new ApplicationError('Post not found', 404);
      }

      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const { content, imageUrl } = req.body;

      const post = PostModel.getById(postId);

      if (!post) {
        throw new ApplicationError('Post not found', 404);
      }

      post.update(content, imageUrl);
      res.status(200).send('Post updated');
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const post = PostModel.getById(postId);

      if (!post) {
        throw new ApplicationError('Post not found', 404);
      }

      post.delete();
      res.status(200).send('Post deleted');
    } catch (err) {
      next(err);
    }
  }
}
