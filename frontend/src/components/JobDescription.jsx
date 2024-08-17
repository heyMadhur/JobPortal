import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

function JobDescription() {
    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>

                <div>
                    <h1 className='font-bold text-xl'>Title:JobRole</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">Part Time</Badge>
                        <Badge className='text-[#7209B7] font-bold' variant="ghost">24 LPA</Badge>
                    </div>
                </div>
                {!isApplied ?
                    <Button className="rounded-lg bg-[#7209B7] hover:bg-[#5F32AD]">Apply Now</Button>
                    :
                    <Button disabled className="rounded-lg bg-gray-600 cursor-not-allowed">Already Applied</Button>}
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Descrition</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>FrontEnd Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis earum rem aperiam enim iusto eligendi sit quod voluptatum, doloremque perspiciatis totam quo esse exercitationem voluptate optio similique maxime quasi distinctio.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 Years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>50LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>17-08-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
