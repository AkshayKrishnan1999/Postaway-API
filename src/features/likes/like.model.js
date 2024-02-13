class LikeModel {
    constructor(postId, userId) {
      this.postId = postId;
      this.userId = userId;
    }
  
    static getAll() {
      return likes;
    }
  
    static getByPostId(postId) {
      return likes.filter((like) => like.postId === postId);
    }
  
    static addLike(postId, userId) {
      likes.push(new LikeModel(postId, userId));
    }
  
    static removeLike(postId, userId) {
      const likeIndex = likes.findIndex(
        (like) => like.postId === postId && like.userId === userId
      );
      if (likeIndex !== -1) {
        likes.splice(likeIndex, 1);
      }
    }
  }
  
  let likes = [];
  export default LikeModel;