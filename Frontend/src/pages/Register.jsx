import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Register=()=>{
  const [data,setdata]=useState({
    companyName:'',
    name:'',
    email:'',
    password:''
  });
  async function submit(){
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      console.log(res.data);
      setdata({
        companyName: "",
        name: "",
        email: "",
        password: ""
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return(
    <div>
      <h1 className='text-center mb-9 font-semibold text-2xl m-3'>Tenant's Register Page</h1>
      <div className='flex flex-col justify-center align-center border p-4 m-4 w-1/2 mx-auto my-4'>
      <div className='mb-4 pr-4'>
      <label className='mr-4 font-medium'>Company Name</label>
      <input type="text" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.companyName} onChange={(e)=>{setdata({...data,companyName:e.target.value})}} placeholder="Enter company name"></input>
      </div>
      <div className='mb-4 pr-4'>
      <label className='mr-4 font-medium'>Admin</label>
      <input type="text" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.name} onChange={(e)=>{setdata({...data,name:e.target.value})}}placeholder="Enter admin name"></input>
      </div>
      <div className='mb-4 pr-4'>
      <label className='mr-4 font-medium'>Email</label>
      <input type="email" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.email} onChange={(e)=>{setdata({...data,email:e.target.value})}} placeholder="Enter email"></input>
      </div>
      <div className='mb-4'>
      <label className='mr-4 font-medium'>Password</label>
      <input type="password" className="placeholder-gray-400 border p-2 w-full my-2 outline-none" value={data.password} onChange={(e)=>{setdata({...data,password:e.target.value})}}placeholder="Enter password"></input>
      </div>
      <button className='bg-blue-600 inline-block p-2 rounded' onClick={submit}>Register</button>
      </div>
    </div>
  )
}
export default Register;