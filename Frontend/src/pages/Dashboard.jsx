import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';
import DashboardADMIN from '../components/DashboardADMIN';
import DashboardMEMBER from '../components/DashboardMEMBER';
// import 
const Dashboard=()=>{
    const [role,setrole]= useState(null);
    useEffect(()=>{
    const token=localStorage.getItem("token");
    const decoded=jwtDecode(token);

        if(token){
            try{
                if(decoded.role==='ORG_ADMIN'){
                    // <DashboardADMIN/>
                    setrole('ORG_ADMIN');
                    
                }
                else{
                    // <DashboardMEMBER/>
                    setrole('MEMBER');
                }
            }catch (error) {
                console.error("Invalid Token");
            }
        }
    },[]);
    return(
        <>
        <Navbar/>
        {(role==='ORG_ADMIN')?
        <DashboardADMIN/>:<DashboardMEMBER/>
        }
        </>
    );
};

export default Dashboard;