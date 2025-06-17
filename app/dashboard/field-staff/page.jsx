'use client'
import React, { useEffect, useState } from 'react'
import { useUserState } from '../store';
import { getProfile } from '@/lib/actions/common';
import Profile from '@/components/common/Profile';

const FieldStaff = () => {

   const [fieldStaffData, setFieldStaffData] = useState();
  
    const userState = useUserState();
  
    let token;
    userState.user.getIdToken().then((res) => {
      token = res;
    }).catch((err) => {
      console.error("Failed to get token:", err);
    });
  
    const fetchFieldStaff = async () => {
      try {
        const res = await getProfile(token, userState?.profile?.username);

        if (res) {
          setFieldStaffData(res?.data);
        }
  
      } catch (error) {
        console.log("ERRor", error);
      }
    }
  
    useEffect(() => {
      fetchFieldStaff();
    }, []);


  return (
    <div>
        <Profile data={fieldStaffData}/>
    </div>
  )
}

export default FieldStaff