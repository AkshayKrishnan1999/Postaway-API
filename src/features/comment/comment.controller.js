// ... (Import Statements)

export default class CommentController {
    async createComment(req, res, next) {
      try {
        const postId = req.params.postId;
        const { content } = req.body;
  
        // ... Post Validation (same as before) ...
  
        const newComment = new CommentModel(
          generateNextId(),
          content,
          req.user.id,
          postId
        );
  
        comments.push(newComment); // Directly added to the in-memory comments array
  
        res.status(201).send(newComment);
      } catch (err) {
        next(err);
      }
    }
  
    async getCommentsByPost(req, res, next) {
      try {
        const postId = req.params.postId;
        const commentsForPost = CommentModel.getByPostId(postId);
        res.status(200).send(commentsForPost);
      } catch (err) {
        next(err);
      }
    }
  
    async updateComment(req, res, next) {
      try {
        const commentId = req.params.id;
        const { content } = req.body;
  
        const comment = CommentModel.getById(commentId);
        if (!comment) {
          throw new ApplicationError('Comment not found', 404);
        }
  
        comment.update(content);
        res.status(200).send('Comment updated');
      } catch (err) {
        next(err);
      }
    }
  
    async deleteComment(req, res, next) {
      try {
        const commentId = req.params.id;
  
        const comment = CommentModel.getById(commentId);
        if (!comment) {
          throw new ApplicationError('Comment not found', 404);
        }
  
        comment.delete(); // Now uses the in-memory deletion logic
        res.status(200).send('Comment deleted');
      } catch (err) {
        next(err);
      }
    }
  }
  