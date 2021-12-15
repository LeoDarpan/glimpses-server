//Handlers of the routes
//If routes file keeps getting more and more request functions, it will get bulky
//and would be difficult to follow. That's where controllers come into play. 
//To make routes more scalable.
//in simple words, the call back functions in every request api in the routes file will
//be declared and defined in this file. Only for Posts.js
//There will be a different file for every routes file.

//Every function need to be exported mind you!

//In order to work with the schemas, for example whenever there is a post request to 
//add a post, then the schema needs to be accessed and for that the file should 
//be imported.

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//Get all the posts available in the database - function for localhost:5000/posts/
export const getPosts = async (request, response) => {
    //This is implemented using the try-catch model
    //Try runs on success and catch runs when there is some error!
    try {
        //Get all the posts from  the database. Add await because its asynchronous
        const postMessages = await PostMessage.find();
        //To make await work, make the function async

        // console.log(postMessages);

        response.status(200).json(postMessages);

    } catch (error) {
        response.status(404).json({message: error.message});
    }
}

//Create a post in the database - function for localhost:5000/posts/create
export const createPost = async (request, response) => {
    const post = request.body;
    const newPost  = new PostMessage({...post, creator: request.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        
        response.status(201).json(newPost);
    } catch (error) {
        response.status(409).json({message: error.message});    
    }
}

//Update a post in the database - function for localhost:5000/:id
export const updatePost = async (request, response) => {
    const { id: _id } = request.params;//Rename the id
    const post = request.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
        return response.status(404).send('No post found!');
    else{
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

        response.json(updatedPost);
    }
}
//Delete a post in the database - function for localhost:5000/delete/:id
export const deletePost = async (request, response) => {
    const { id } = request.params;

    if(mongoose.Types.ObjectId.isValid(id))
        await PostMessage.findByIdAndDelete(id);

    response.json({ message: "Post deleted successfully!"});
}
//Like a post - function for localhost:5000/:id/likePost
export const likePost = async (request, response) => {
    console.log(request.userId);
    const { id } = request.params;

    if(!request.userId) return response.json({ message: 'Unauthenticated!' });

    if(mongoose.Types.ObjectId.isValid(id)){
        const post = await PostMessage.findById(id);
        //Check if the user has already liked the post, his id would be found in the likes
        const index = post.likes.findIndex((id) => id===String(request.userId)); 
        //The result above would be -1 if the id is not there
        if(index === -1){
            //like the post
            post.likes.push(request.userId);
        }else{
            //remove the like
            post.likes = post.likes.filter((id) => id !== String(request.userId));
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        response.json(updatedPost);
    }else{
        return response.status(404).send("No post exists with the ID!");
    }
}
