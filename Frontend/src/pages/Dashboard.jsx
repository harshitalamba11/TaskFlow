import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';
// import 
const Dashboard=()=>{
    const [countProjects,setCountProject]=useState(0);
    const [countEmployees,setEmployee]=useState(0);
    const [countTasks,setTasks]=useState(0);
    useEffect(()=>{
    const token=localStorage.getItem("token");
    const decoded=jwtDecode(token);
    console.log(decoded);

        if(token){
            try{
                // const decoded=jwtDecode(token);

                if(decoded.role==='ORG_ADMIN'){
                    fetch(`http://localhost:5000/api/projects/${decoded.tenantId}`)
                    .then(res=>res.json())
                    .then(data=>setCountProject(data.totalEntries));
                    fetch(`http://localhost:5000/api/tasks/${decoded.tenantId}`)
                    .then(res=>res.json())
                    .then(data=>setTasks(data.totalEntries));
                    
                }
                else{
                    setEmployee(0);
                    fetch(`http://localhost:5000/api/projects/member/${decoded.userName}`)
                    .then(res=>res.json())
                    .then(data=>setCountProject(data.totalEntries));
                    fetch(`http://localhost:5000/api/tasks/member/${decoded.userId}`)
                    .then(res=>res.json())
                    .then(data=>setTasks(data.totalEntries));
                }
            }catch (error) {
                console.error("Invalid Token");
            }
        }
    },[]);
    return(
        <>
        <Navbar/>
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

export default Dashboard;