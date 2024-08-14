import { User } from "../models/user.model.js"
import brypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        }

        const hashedPassword = await brypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.error(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Wrong Email or Password",
                success: false
            });
        }
        const passwordMatch = await brypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Wrong Email or Password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }

        // Create a token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Cloudinary File Setup Process

        // Skills will come in String format. Will have to convert it to array format
        let skillsArray;
        if(skills){
            skillsArray= skills.split(",");

        }
        const userId = req.id;       // Middleware Authentication

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not Found",
                success: false
            });
        }

        // Updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray 

        // Resume COmes here later

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated Successfully", 
            user, 
            success: true
        })


    } catch (error) {

    }
}