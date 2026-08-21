import React from 'react'
import { getmeProfile } from './_actions/profileAction'
import ProfileUi from './_components/ProfileUi'


const profilepage = async() => {
  const profileData=await getmeProfile()
  return (
    <div><ProfileUi profileData={profileData}></ProfileUi></div>
  )
}

export default profilepage