'use client'
import Profile from '@/components/common/Profile'
import { getProfile } from '@/lib/actions/common';
import React, { useEffect, useState } from 'react'
import { useUserState } from '../store';

const Dashboard = () => {

  const [rmData, setrmData] = useState();

  const userState = useUserState();

  let token;
  userState.user.getIdToken().then((res) => {
    token = res;
  }).catch((err) => {
    console.error("Failed to get token:", err);
  });

console.log(userState?.profile);


  const fetchrm = async () => {
    try {
      const res = await getProfile(token, userState?.profile?.username);
      console.log(res);
      if (res) {
        setrmData(res?.data);
      }

    } catch (error) {
      console.log("ERRor", error);
    }
  }

  useEffect(() => {
    fetchrm();
  }, []);
  return (
    <div>
      <Profile data={rmData} />
    </div>
  )
}

export default Dashboard