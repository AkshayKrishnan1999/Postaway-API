class PostModel {
  constructor(id, content, imageUrl, author, likes, comments, createdAt) {
    this.id = id;
    this.content = content;
    this.imageUrl = imageUrl;
    this.author = author;
    this.likes = likes || [];
    this.comments = comments || [];
    this.createdAt = createdAt || new Date();
  }

  // Static Methods

  static getAll() {
    return posts;
  }

  static getById(id) {
    const post = posts.find((post) => post.id === id);
    return post; // Returns the post or undefined if not found
  }

  static getByAuthor(authorId) {
    return posts.filter((post) => post.author === authorId);
  }

  static create(content, imageUrl, author) {
    const newPost = new PostModel(
      generateNextId(),
      content,
      imageUrl,
      author
    );
    posts.push(newPost);
    return newPost;
  }

  // Instance Methods (Modify a Specific Post)

  update(newContent, newImageUrl) {
    this.content = newContent;
    this.imageUrl = newImageUrl;
  }

  delete() {
    const postIndex = posts.findIndex((p) => p.id === this.id);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1); // Remove from the array
    }
  }
}

// ... Data Initialization and ID Generation ... 
let posts = [];
let nextPostId = 1;

function generateNextId() {
  return nextPostId++;
}
export default PostModel;