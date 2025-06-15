'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getDSADataById } from '@/lib/actions/dsa'
import { useUserState } from '../../store'

const Profile = () => {
  const [DSAData,setDSAData]=useState();

  const userState = useUserState();
 
  let token;
  userState.user.getIdToken().then((res) => {
    token=res;
  }).catch((err) => {
    console.error("Failed to get token:", err);
  });



  const fetchDSAREcord = async() => {
    try {
      const res =await getDSADataById(token,userState?.profile?.username);
      console.log(res);
      if(res){
        setDSAData(res?.data);
      }
      
    } catch (error) {
      console.log("ERRor",error);
    }
  }

  useEffect(() => {
    fetchDSAREcord();
  }, []);

  return (
    <div>
      {/* <DSA data={DSAData} role={userState?.profile?.role} /> */}
      <Profile data={DSAData} role={userState?.profile?.role} />
    </div>
  )
}

export default Profile