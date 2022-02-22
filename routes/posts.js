import express from 'express';

//In order to get the functions to work, they need to be imported to the routes file
//The functions made in the controllers folder files are exported and are imported here.

import { getPosts, getPost,  getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//Get all the posts available in the database
//Whenever the request is localhost:5000/posts/ - run the getPosts function from the 
//controllers/posts.js file
router.get('/', getPosts);

//Get only those posts that match the search parameters
router.get('/search/', getPostsBySearch);

//Add a new post to the database
//Whenever there is a post request at localhost:5000/posts/create - run the createPost
//function from the same file mentioned in previous comment
// The logic for handling single like per person needs to be built here
//To restrict the user to update or delete the posts created by them only
//the logic will be made on the frontend, and its simple, just disable the buttons for the actions.
router.post('/create', auth,  createPost);

//To update already existing data use patch
router.patch('/:id', auth, updatePost)

//To delete a specific post
router.delete('/delete/:id', auth,  deletePost);

//To like posts
router.patch('/:id/likePost', auth, likePost);
//The controller gets access to all the data set in the auth middleware which puts in the 
//body of the request

//Get a specific post as per its _id
router.get('/:id', getPost);

export default router; 
