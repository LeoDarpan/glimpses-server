import mongoose from 'mongoose';

// --This schema decides how the documents in the database would be made for each post--

const postSchema = mongoose.Schema({ 
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,//To convert an image into String using base64 and this will hold that striged image
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
//----------Schema is ready!--------------

//Add documents to the database
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;