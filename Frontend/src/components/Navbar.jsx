import React from 'react';
import {jwtDecode} from "jwt-decode";

const Navbar=()=>{
    const token=localStorage.getItem("token");
    let user=null;
    if(token){
        user=jwtDecode(token);
    }
    else{
        user="Login";
    }
    return(
        <>
        <div className='flex flex-row justify-between bg-slate-300 h-24'>
            <div className='flex justify-center flex-col my-auto mx-5 '>
                <p className='font-serif text-lg font-bold text-5xl'>TaskFlow</p>
                <p className='text-l text-end font-thin text-green-700'>Top Saas</p>
            </div>

            <div className='text-4xl text-teal-700 flex justify-center my-5 mr-7'>
                <i className="fa-solid fa-user"></i>
                <p className="inline-block text-xl font-medium  text-green-700  bg-green-50 border  border-green-600 px-4 pt-1 pb-1 mb-4 rounded-full text-center">
                    {user?.userName || "Guest"} <i className="fa-solid fa-angle-down"></i>
                </p>
                
            </div>
        </div>
        </>
    )
}

export default Navbar;