import React from 'react'
import { Outlet, Link } from "react-router-dom";



function Layout() {
  return (
    <>
      <nav>
          {/* <li><Link to="/"></Link></li> */}
          {/* <li><Link to="/polldetail"></Link></li> */}
          {/* <li><Link to="/vote"></Link></li> */}
          {/* <li><Link to="/createpoll"></Link></li> */}
      </nav>

      <Outlet />
    </>
  )
}

export default Layout