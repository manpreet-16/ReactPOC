import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import HomePageUI from './HomePageUI';

function ProtectedComponent({children}) {
    let {userState,setUserState} = useAuth()
    let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''

    // useEffect(()=>{ 
    //   token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''
    // },[])

    return (
      <div>
        { userState || token ?  <> <HomePageUI><Outlet/></HomePageUI> </> : <Navigate to="/login" />}
      </div>
    )
}

export default ProtectedComponent
