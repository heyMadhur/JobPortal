import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allAppliedJobs: [],
        allJobs: [],
        allJobsAdmin: [],
        searchJobByText: "",
        singleJob: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllJobsAdmin: (state, action) => {
            state.allJobsAdmin = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        }
    }
})

export const { setAllJobs, setSingleJob, setAllJobsAdmin, setSearchJobByText, setAllAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;
