import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true,
    }, 
    requirements: [{
        type: String
    }],
    experienceLevel: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    jobType: {
        type: String,
        required: true
    }, 
    position: {     // Number of Openings
        type: Number,
        required: true
    }, 
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
            // Required True nahi likha q ki job create wakt applaication require true nhi hoga but apply krte wakt hoga
        }
    ]


}, {timestamps:true});
export const Job= mongoose.model('Job', jobSchema);