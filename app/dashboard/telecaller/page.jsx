'use client'
import Profile from '@/components/common/Profile'
import { getProfile } from '@/lib/actions/common';
import React, { useEffect, useState } from 'react'
import { useUserState } from '../store';

const Dashboard = () => {

  const [tellecallerData, setTelecallerData] = useState();

  const userState = useUserState();

  let token;
  userState.user.getIdToken().then((res) => {
    token = res;
  }).catch((err) => {
    console.error("Failed to get token:", err);
  });



  const fetchTelecaller = async () => {
    try {
      const res = await getProfile(token, userState?.profile?.username);
      console.log(res);
      if (res) {
        setTelecallerData(res?.data);
      }

    } catch (error) {
      console.log("ERRor", error);
    }
  }

  useEffect(() => {
    fetchTelecaller();
  }, []);
  return (
    <div>
      <Profile data={tellecallerData} />
    </div>
  )
}

export default Dashboard