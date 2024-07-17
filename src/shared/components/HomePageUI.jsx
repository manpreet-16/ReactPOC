import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function HomePageUI({children}) {
    let navigate = useNavigate()
    let logout = () =>{
        localStorage.removeItem('token')
        navigate("/login")
    }
  return (
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>WELCOME </h3>
            </div>

            <ul class="list-unstyled components">
            <li>
                    <Link to="/dashboard">Dashborad</Link>
                </li>
                <li>
                    <Link to="/restaurant">Restaurants</Link>
                </li>
                {/* <li>
                    <Link to="/dish">Dishes</Link>
                </li> */}
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li>
                    <Link onClick={logout}>Log Out</Link>
                </li>
            </ul>
        </nav>

        <div id="content">
            {children}
        </div>
    </div>
  )
}

export default HomePageUI
