import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '@/utils/constant';

function JobDescription() {
    const isApplied = true;
    const jobId = useParams().id;
    const dispatch= useDispatch();
    const {singleJob}= useSelector(store=>store.job)
    const {user}= useSelector(store=>store.auth)    
    
    useEffect(() => {        
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })     
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (error) {
                console.log(error);
                // console.log(error.response.data.message);
            }
        }

        fetchSingleJobs();

    }, [jobId, dispatch, user?._id])
    

    return (<>
        <Navbar />
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>

                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209B7] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                {!isApplied ?
                    <Button className="rounded-lg bg-[#7209B7] hover:bg-[#5F32AD]">Apply Now</Button>
                    :
                    <Button disabled className="rounded-lg bg-gray-600 cursor-not-allowed">Already Applied</Button>}
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Descrition</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} Years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>17-08-2024</span></h1>
            </div>
        </div>
    </>
    )
}

export default JobDescription
