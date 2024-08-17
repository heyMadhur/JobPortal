import { Avatar, AvatarImage } from '../ui/avatar'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const SingleJob = () => {
    const navigate= useNavigate();
    const jobId= "kdjslk32jk"
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>

            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg '>Company Name</h1>
                    <p className='text-gray-500 text-sm '>India</p>
                </div>
            </div>

            <div>
                <h1 className='text-lg font-bold my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ab minima suscipit a, tenetur eum iste. Ex eius ut incidunt.</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">Part Time</Badge>
                <Badge className='text-[#7209B7] font-bold' variant="ghost">24 LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>{navigate(`/jobs/description/${jobId}`)}} variant="outline">Details</Button>
                <Button className="bg-[#7209B7]">Save for Later</Button>
            </div>

        </div>
    )
}

export default SingleJob
