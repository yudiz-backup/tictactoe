import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from './isLoggedIn'

const PrivateRoute = () => {
	return isLoggedIn() === true ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
