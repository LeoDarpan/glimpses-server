import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (request, response) => {
    const { email, password } = request.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return response.status(404).json("User does not exist!");

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return response.status(400).json("Invalid credentials!");

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, {
            expiresIn: '1h'
        });
        response.status(200).json({ result: existingUser, token});
    } catch (error) {
        response.status(500).json("Something went wrong!");
    }
}

export const signup = async (request, response) => {
    const { email, password, lastName, firstName, confirmPassword } = request.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return response.status(400).json("User already exists!");

        if(password !== confirmPassword) return response.status(400).json("Passwords do not match!");

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, {
            expiresIn: '1h'
        });
        response.status(200).json({ result, token});
    } catch (error) {
        response.status(500).json("Something went wrong!");
    }
}