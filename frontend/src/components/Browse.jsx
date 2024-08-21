import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import JobCard from './shared/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const jobs = [1, 2, 3];

function Browse() {
    useGetAllJobs();
    const {allJobs}= useSelector(store=>store.job)
    const dispatch= useDispatch();
    useEffect(()=>{

        // Will change while leaving the page
        return ()=>{
            dispatch(setSearchedQuery(""))
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt'>
                    {
                        allJobs.map((job) => {
                            return (
                                <JobCard key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Browse
