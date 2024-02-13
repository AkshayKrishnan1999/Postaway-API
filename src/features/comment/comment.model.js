class CommentModel {
    constructor(id, content, author, postId, createdAt) {
      this.id = id;
      this.content = content;
      this.author = author;
      this.postId = postId;
      this.createdAt = createdAt || new Date();
    }
  
    static getAll() {
      return comments; 
    }
  
    static getById(id) {
      return comments.find((c) => c.id === id);
    }
  
    static getByPostId(postId) {
      return comments.filter((c) => c.postId === postId);
    }
  
    update(newContent) {
      this.content = newContent;
    }
  
    delete() {
      const commentIndex = comments.findIndex((c) => c.id === this.id);
      if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
      }
    }
  }
  
  // Initialization and ID Generation...
  let comments = [];
  let nextCommentId = 1;
  
  function generateNextId() {
    return nextCommentId++;
  }
  