import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJob = async (req, res) => {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
        return res.status(400).json({ message: "Job ID is required", success: false });
    }

    // Check If Job exist or not
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: "Job Not Found", success: false });
    }

    // Check If User already applied for this job or not
    const appliedJobs = await Application.findOne({ job: jobId, applicant: userId });
    if (appliedJobs) {
        return res.status(400).json({
            message: "You already applied for this job", success: false
        });
    }

    // Add the Application into the Job
    const application = await Application.create({
        job: jobId,
        applicant: userId
    })
    job.applications.push(application._id);
    await job.save();
    res.status(201).json({ message: "Application Added Successfully", job, success: true });
}

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({ message: "No Application Found", success: false });
        }
        res.status(200).json({ message: "Application Found", success: true, application });
    }
    catch (error) {
        console.log(error);
    }
}

// For Admins
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicants = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!applicants) {
            return res.status(404).json({ message: "No Applicants Found", success: false });
        }
        res.status(200).json({ message: "Applicants Found", success: true, applicants });

    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application Not Found", success: false });
        }
        application.status = status;
        await application.save();
        res.status(200).json({ message: "Status Updated", success: true, application });

    } catch (error) {
        console.log(error);
    }
}