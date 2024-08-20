import React from 'react'
import Navbar from './shared/Navbar'
import JobCard from './shared/JobCard';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const Jobs = () => {
  useGetAllJobs();
  const {allJobs}= useSelector(store => store.job);  


  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-[20%]'>
            <FilterCard />
          </div>
          {
            allJobs.length <= 0 ?
              <span>Job not Found</span> :
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {allJobs.map((job) => <div key={job?._id}><JobCard job={job} /></div> )}
                </div>
              </div>
          }
        </div>
      </div>

    </div>
  )
}

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai" ]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer" ]
  },
  {
    filterType: "Salary",
    array: ["0-10LPA", "11LPA-30LPA", "Above 30LPA" ]
  },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index)=> (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  return (
                    <div key={idx} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default Jobs
