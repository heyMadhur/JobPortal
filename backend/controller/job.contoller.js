import { Job } from "../models/job.model.js"
import { User } from "../models/user.model.js"

// For Admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check if user is an Admin
        const user= await User.findById(userId);
        if(user.role!=="recruiter"){
            return res.status(401).json({ message: "You are not authorized to post a job", success: false });
        }

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "Please fill in all fields.", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({ message: "Job posted successfully.", success: true, job });

    } catch (error) {
        console.log(error);

    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        }).populate({
            path: "created_by"
        }).sort({createdAt: -1});
        
        if (!jobs) {
            return res.status(404).json({ message: "No jobs found.", success: false });
        }
        return res.status(200).json({
            message: "Jobs retrieved successfully.", success: true,
            jobs
        });

    } catch (error) {
        console.log(error);
    }
}

// For Students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            // The $or operator in MongoDB is used to specify multiple conditions. Documents that match at least one of these conditions will be returned.
            $or: [
                { title: { $regex: keyword, $options: "i" } },      // This condition checks if the title field of a job contains the keyword. It uses a regular expression ($regex) to perform a pattern match. The "i" option makes the search case-insensitive, meaning it will match the keyword regardless of whether it's in uppercase or lowercase.
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({ message: "No jobs found.", success: false });
        }
        return res.status(200).json({ message: "Jobs retrieved successfully.", success: true, jobs });

    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications'
        });
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({
            message: "Job retrieved successfully.", success: true,
            job
        });


    } catch (error) {
        console.log(error);

    }
}
