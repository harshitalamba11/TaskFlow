import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Login=()=>{
    const navigate=useNavigate();
    const [data,setdata]=useState({
    email:'',
    password:''
  });
  async function submit(){
    try {
      if(data.email==='' || data.password==='') alert("Incomplete Details!!");
      const res=await axios.post("http://localhost:5000/api/auth/login",data);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      console.log("Login successful");
      setdata({
        email: "",
        password: ""
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
    return(
        <>
            <h1 className='text-center mb-9 font-semibold text-2xl m-3'>Tenant's Login Page</h1>
            <div className='flex flex-col justify-center align-center border p-4 m-4 w-1/2 mx-auto my-4'>
            {/* <div className='mb-4 pr-4'>
            <label className='mr-4 font-medium'>Admin</label>
            <input type="text" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.name} onChange={(e)=>{setdata({...data,name:e.target.value})}}placeholder="Enter admin name"></input>
            </div> */}
            <div className='mb-4 pr-4'>
            <label className='mr-4 font-medium'>Email</label>
            <input type="email" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.email} onChange={(e)=>{setdata({...data,email:e.target.value})}} placeholder="Enter email"></input>
            </div>
            <div className='mb-4'>
            <label className='mr-4 font-medium'>Password</label>
            <input type="password" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.password} onChange={(e)=>{setdata({...data,password:e.target.value})}}placeholder="Enter password"></input>
            </div>
            <button className='bg-blue-600 inline-block p-2 rounded' onClick={submit}>Login</button>
            </div>
        </>
    );
}

export default Login;