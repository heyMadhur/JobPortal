import { setAllJobsAdmin } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllJobsAdmin= async() => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAllJobsAdmin= async ()=>{
            try {
                const res= await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials: true});
                if(res.data.success){
                    
                    dispatch(setAllJobsAdmin(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobsAdmin();
    }, [])
 }

export default useGetAllJobsAdmin
