// 1. Import Exprerss
import express from 'express';

import cors from 'cors';

import postRouter from './src/features/post/post.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import commentRouter from './src/features/comment/comment.route.js';
import likeRouter from './src/features/likes/like.route.js'

import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
// 2. Create Server
const server = express();



server.use(express.json());
server.use(loggerMiddleware);

server.use(
  '/api/posts',
  
  postRouter
);
server.use('/api/users', userRouter); 
server.use("/api/comment", jwtAuth, commentRouter);
server.use('/api/like', likeRouter);

server.get('/', (req, res) => {
  res.send('Welcome to Postaway-');
});

server.use((err, req, res, next)=>{
  console.log(err);
  if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }

  res
  .status(500)
  .send(
    'Something went wrong, please try later'
    );
});

// 4. Middleware to handle 404 requests.
server.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});


// 5. Specify port.
server.listen(3200);

console.log('Server is running at 3200');
