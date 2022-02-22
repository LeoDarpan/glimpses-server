//Import all the modules that make up the app
import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Imported all the routes in the posts.js
import postRoutes from './routes/posts.js';
//Imported all the routes in the users.js
import userRoutes from './routes/users.js';
//App initialisation
const app = express(); 

//Body parser
app.use(express.json({ limit: '30mb', extended: true })); 
app.use(express.urlencoded({ limit: '30mb', extended: true })); 
//Cross origin resource sharing
app.use(cors());

//Every route in the postRoutes will start with the '/posts'
app.use('/posts', postRoutes);
//Every route in the userRoutes will start with the '/users'
app.use('/users', userRoutes);

app.get('/', (request, response) => response.send("Welcome to Glimpses API"))

//Database connection and server initialisation
const url = process.env.DATABASE_URL;//Database Url coming from .env
const PORT = process.env.PORT || 5000;//Heroku will populate the environemtal variable called PORT
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Database Connected and Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

