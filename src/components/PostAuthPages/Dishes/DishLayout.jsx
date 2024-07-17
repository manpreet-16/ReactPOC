import React from 'react'
import { Outlet } from 'react-router-dom'

function DishLayout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default DishLayout
