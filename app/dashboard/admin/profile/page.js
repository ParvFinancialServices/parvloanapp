'use client'
import React, { useEffect, useState } from 'react'
import DSA from './DSA'
import { useSearchParams } from 'next/navigation'
import { getDSADataById } from '@/lib/actions/dsa'
import { useUserState } from '../../store'

const Profile = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const role = searchParams.get("role");
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
      const res =await getDSADataById(token,username);
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
      <DSA data={DSAData} />
    </div>
  )
}

export default Profile