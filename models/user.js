import mongoose from 'mongoose';

// --This schema decides how the documents in the database would be made for each post--

const userSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
});
//----------Schema is ready!--------------

//Add Users to the database
const User = mongoose.model('User', userSchema);

export default User;