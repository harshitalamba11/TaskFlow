import React,{useEffect,useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {useLocation,Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-user } from '@fortawesome/free-solid-svg-icons';
const Navbar=()=>{
    const location=useLocation();
    const [hover,sethover]=useState(false);
    const [visible,setvisible]=useState(false);
    const token=localStorage.getItem("token");
    const [company, setCompany] = useState(null);
    const [user, setUser] = useState(null);

    const getCompany=async(id)=>{
        fetch(`http://localhost:5000/tenant/${id}`)
        .then(res => res.json())
        .then(data => {
        setCompany(data.name);
        // console.log(company);
    })
    .catch(err => console.error(err));

    }
    useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log(decodedUser);

      if (decodedUser?.tenantId) {
        getCompany(decodedUser.tenantId);
      }
    }
    }, [token]);
    useEffect(()=>{
        if(hover){
        // console.log("hello");
        setvisible(true);
        }
        else{
            setvisible(false);
        }
    },[hover]);

    const getLocation=(path)=>{
        return location.pathname===path?"text-slate-500 pointer-events-none":"text-slate-800 hover:text-teal-600 cursor-pointer";
    };
    return(
        <>
        <div className='flex flex-row justify-between bg-slate-300 h-23'>
            <div className='flex justify-center flex-col my-auto mx-5 '>
                <p className='font-serif font-bold text-5xl cursor-pointer'>TaskFlow</p>
                <p className='text-l text-end font-thin text-green-700 cursor-pointer'>Top Saas</p>
            </div>

            <div className='flex flex-row p-4 justify-center my-auto mx-auto mb-4 font-serif text-2xl'>
                <Link to='/dashboard'><h3 className={`${getLocation("/dashboard")} px-6`} >Home</h3></Link>
                <Link to='/employees'><h3 className={`${getLocation("/employees")} px-6`}>Employees</h3></Link>
                <Link to='/tasks'><h3 className={`${getLocation("/tasks")} px-6`}>Tasks</h3></Link>
            </div>

            <div className="flex flex-col">
                <div 
                onMouseEnter={()=>sethover(true)}
                className='group text-4xl text-teal-700 flex justify-center my-5 mr-7 cursor-pointer'>
                <i className="fa-solid fa-user"></i>
                <p className="inline-block text-xl font-medium  text-green-700  bg-green-50 border  border-green-600 px-4 pt-1 pb-1 mb-4 rounded-full text-center cursor-pointer">
                    {user?.userName || "Guest"} <i className="fa-solid fa-angle-down ml-2 transition-transform duration-300 group-hover:rotate-180 group-hover:text-blue-500"></i>
                </p>
                
                </div>

                <div>
                {visible && (
                <div onMouseLeave={()=>sethover(false)} className="absolute right-0 mt-2 bg-slate-100 border rounded shadow-lg p-4">
                <p><label className='text-black font-semibold '>UserId:</label> {user.userId}</p>
                <p><label className='text-black font-semibold'>Role:</label> {user.role}</p>
                <p className="text-gray-700 font-semibold"><label>Company:</label> {company || "No Company Data"}</p>
                <hr className="my-3 border-slate-300" />
                <Link to='/login'><p className='border rounded-xl bg-red-700 text-white my-3 mx-5 text-center py-2'>Logout</p></Link>
                </div>
                )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;