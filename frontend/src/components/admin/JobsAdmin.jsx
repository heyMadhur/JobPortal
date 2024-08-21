import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobsAdmin from '@/hooks/useGetAllJobsAdmin'
import { setSearchJobByText } from '@/redux/jobSlice'

const JobsAdmin = () => {

    useGetAllJobsAdmin()

    const navigate = useNavigate();
    const [input, setInput] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input))

    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/jobs/create')}>Post New Job</Button>
                </div>
                <JobsTableAdmin />

            </div>
        </div>
    )
}

const JobsTableAdmin = () => {
    const { allJobsAdmin, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobsAdmin)
    const navigate = useNavigate();


    useEffect(() => {
        const filteredJobs = allJobsAdmin.length > 0 && allJobsAdmin.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            console.log("TRIGGERED");
            
            return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())

        })
        setFilterJobs(filteredJobs);
    }, [allJobsAdmin, searchJobByText]);

    return (
        <>
            <Table>
                <TableCaption>A list of your recent posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.length <= 0 ? <span>You haven't Registered any company yet...</span>
                            :
                            filterJobs?.map((job) => {

                                return (
                                    <TableRow key={job._id}>
                                        <TableCell>{job?.company?.name}</TableCell>
                                        <TableCell>{job?.title}</TableCell>
                                        <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default JobsAdmin
