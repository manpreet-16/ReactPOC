import React from 'react'
import { Outlet } from 'react-router-dom'

function RestaurantLayout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default RestaurantLayout
