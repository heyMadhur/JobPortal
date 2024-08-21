import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
        <CompaniesTable />

      </div>
    </div>
  )
}

const CompaniesTable = () => {
  const { allCompanies } = useSelector(store => store.company);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allCompanies.length <= 0 ? <span>You haven't Registered any company yet...</span>
              :
              allCompanies?.map((company) => {
                return (
                  <TableRow key={company._id}>
                    <TableCell>
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={company?.logo} alt="profile" />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div className='flex items-center gap-2 w-fit cursor-pointer'>
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

export default Companies
