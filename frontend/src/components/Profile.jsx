import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Loader2, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const haveResume = true;

function Profile() {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border-collapse border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => { setOpen(true) }} variant="outline" className="text-right" ><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>

                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        haveResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='_blank' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                {/* Application Table */}
                <AppliedJobTable />

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />

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
                        [1, 2, 3, 4].map((item, index) => {
                            return (
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

const UpdateProfileDialog = ({ open, setOpen }) => {

    const { user, loading } = useSelector(store => store.auth);

    const dispatch= useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill => skill),
        file: user?.profile?.resume
    });

    const changeEventHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const fileChangeHandler = (event) => {
        const file = event.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('bio', input.bio);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })

            if (res.data.success) {
                console.log("Updated User= ", res.data.user);
                
                dispatch(setUser(res.data.user));   // Set Updated Details
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
            setOpen(false);
        }
    }



    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                            <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input id="file" name="file" onChange={fileChangeHandler} type="file" accept="application/pdf" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ?
                                <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button>
                                :
                                <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Profile
