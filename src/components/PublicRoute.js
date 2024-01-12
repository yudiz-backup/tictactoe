import React from 'react'
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from './isLoggedIn'
import PropTypes from 'prop-types'

const PublicRoute = ({ children }) => {
	return isLoggedIn() === true ? <Navigate to='/' replace /> : children
}

export default PublicRoute

PublicRoute.propTypes = {
	children: PropTypes.object,
}
