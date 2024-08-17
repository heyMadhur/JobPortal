import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];

function Profile() {
    const haveResume = true;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border-collapse border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={`https://github.com/shadcn.png`} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem sint itaque similique modi illo quod, at molestiae nisi qui facilis.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="text-right" ><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>madhur@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>1234567890</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>

                        {
                            skills.length !== 0 ? skills.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        haveResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='_blank' href='#'>Madhur Gupta</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                {/* Application Table */}
                <AppliedJobTable />

            </div>
        </div>
    )
}

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4].map((item, index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>17-08-2024</TableCell>
                                    <TableCell>Full Stack Developer</TableCell>
                                    <TableCell>Google</TableCell>
                                    <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Profile
