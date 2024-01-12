import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import ChangePassword from './pages/ChangePassword'
import EditProfile from './pages/EditProfile'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { setProfile } from './store/actions/profileActions'

function App() {
	const dispatch = useDispatch()

	const token = localStorage.getItem('token')

	useEffect(() => {
		if (token !== null) {
			dispatch(setProfile(token))
		}
	}, [])
	return (
		<>
			<Routes>
				<Route path='/' element={<PrivateRoute />}>
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/editprofile' element={<EditProfile />} />
					{/* <Route path='/resetpassword' element={<ResetPassword />} /> */}
					<Route path='/changepassword' element={<ChangePassword />} />
				</Route>
				<Route
					path='/signin'
					element={
						<PublicRoute>
							<SignIn />
						</PublicRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path='/forgotpassword'
					element={
						<PublicRoute>
							<ForgotPassword />
						</PublicRoute>
					}
				/>
				<Route
					path='/resetpassword'
					element={
						<PublicRoute>
							<ResetPassword />
						</PublicRoute>
					}
				/>
			</Routes>
		</>
	)
}

export default App
