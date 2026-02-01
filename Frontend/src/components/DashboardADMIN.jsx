import React,{useState,useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
const DashboardADMIN=()=>{
    const [countProjects,setCountProject]=useState(0);
    const [countEmployees,setEmployee]=useState(0);
    const [countTasks,setTasks]=useState(0);
    useEffect(()=>{
    const token=localStorage.getItem("token");
    const decoded=jwtDecode(token);
    // console.log(decoded);

        if(token){
            try{
                    const apiUrl = import.meta.env.VITE_API_URL;
                    fetch(`${apiUrl}/api/projects/${decoded.tenantId}`)
                    .then(res=>res.json())
                    .then(data=>setCountProject(data.totalEntries));
                    fetch(`${apiUrl}/api/tasks/${decoded.tenantId}`)
                    .then(res=>res.json())
                    .then(data=>setTasks(data.totalEntries));
                    fetch(`${apiUrl}/api/employees/${decoded.tenantId}`)
                    .then(res=>res.json())
                    .then(data=>setEmployee(data.totalEntries));
                    
            }catch (error) {
                console.error("Invalid Token");
            }
        }
    },[]);
    return(
        <>
        {/* <Navbar/> */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 m-6'>
            {/* Card 1: Increased size using h-64 and text sizes */}
            <div className='bg-slate-400 p-10 rounded-3xl flex flex-col justify-center items-center shadow-lg h-64'>
                <p className='text-5xl font-bold'>{countProjects}</p>
                <p className='text-xl font-semibold mt-2'>Projects</p>
            </div>

            {/* Card 2 */}
            <div className='bg-slate-400 p-10 rounded-3xl flex flex-col justify-center items-center shadow-lg h-64'>
                <p className='text-5xl font-bold'>{countEmployees}</p>
                <p className='text-xl font-semibold mt-2'>Employees</p>
            </div>

            {/* Card 3 */}
            <div className='bg-slate-400 p-10 rounded-3xl flex flex-col justify-center items-center shadow-lg h-64'>
                <p className='text-5xl font-bold'>{countTasks}</p>
                <p className='text-xl font-semibold mt-2'>Tasks</p>
            </div>
        </div>
        </>
    );
};

export default DashboardADMIN;