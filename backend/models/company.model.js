import mongoose from "mongoose"

const companySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
    }, 
    website: {
        type: String
    },
    location: {
        type: String,
    },
    logo: {
        type: String,       // URL to Company Logo
    },  
    userId: {           // Company kis User ne create kri h uske liye
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {timestamps:true});
export const Company= mongoose.model('Company', companySchema);