import LikeModel from './like.model.js';
// (Might not be needed directly)
import { ApplicationError } from '../../error-handler/applicationError.js';

export default class LikeController {
  async getLikesByPost(req, res, next) {
    try {
      const postId = req.params.postId;
      const likesForPost = LikeModel.getByPostId(postId);
      res.status(200).send(likesForPost);
    } catch (err) {
      next(err);
    }
  }

  async toggleLike(req, res, next) {
    try {
      const postId = req.params.postId;
      const userId = req.user.id;

      const existingLike = LikeModel.getByPostId(postId).find(
        (like) => like.userId === userId
      );

      if (existingLike) {
        LikeModel.removeLike(postId, userId);
      } else {
        LikeModel.addLike(postId, userId);
      }

      res.status(200).send('Like updated');
    } catch (err) {
      next(err);
    }
  }
}
