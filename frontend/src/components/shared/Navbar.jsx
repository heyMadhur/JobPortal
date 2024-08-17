import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar= () => {

    // const user = false;
    const {user}= useSelector(store=>store.auth);
    console.log(user);
    

    return (
        <div className="bg=white">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

                {/* Heading/Logo */}
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>

                {/* Navigation Menu */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-semibold items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>

                    {/* Avatar */}
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={'/login'}><Button variant="outline">Log In</Button></Link>
                                <Link to={'/signup'}><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] ">Sign Up</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>Madhur Gupta</h4>
                                                <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit .</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link"><Link to={'/profile'}>View Profile</Link></Button>
                                            </div>
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button variant="link">Log out</Button>
                                            </div>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>

            </div>
        </div>
    )
}

export default Navbar
