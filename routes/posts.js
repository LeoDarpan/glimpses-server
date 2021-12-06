import express from 'express';

//In order to get the functions to work, they need to be imported to the routes file
//The functions made in the controllers folder files are exported and are imported here.

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

//Get all the posts available in the database
//Whenever the request is localhost:5000/posts/ - run the getPosts function from the 
//controllers/posts.js file
router.get('/', getPosts);

//Add a new post to the database
//Whenever there is a post request at localhost:5000/posts/create - run the createPost
//function from the same file mentioned in previous comment
router.post('/create', createPost);
//To update already existing data use patch
router.patch('/:id', updatePost)
//To delete a specific post
router.delete('/delete/:id', deletePost);
//To like posts
router.patch('/:id/likePost', likePost);

export default router; 
