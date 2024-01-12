import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import '../assets/styles/signup.scss'
import bg1 from '../assets/images/ella-don-JomkRNkzKhE-unsplash.jpg'
import illustration1 from '../assets/images/illustration1.png'
import { Field, Form, Formik } from 'formik'
import logo from '../assets/images/logo-colorful.png'
import { motion } from 'framer-motion'
import {
	Alert,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import * as yup from 'yup'
import { signup } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
	firstName: yup
		.string('Enter your first name')
		.required('First Name is required')
		.min(4, 'First Name should be of minimum 4 characters length')
		.matches(/^[A-Za-z0-9_.]+$/, 'Please remove Extra Spaces '),
	lastName: yup
		.string('Enter your last name')
		.required('Last Name is required')
		.min(4, 'Last Name should be of minimum 4 characters length')
		.matches(/^[A-Za-z0-9_.]+$/, 'Please remove Extra Spaces'),
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	username: yup
		.string('Enter your username')
		.required('Username is required')
		.min(4, 'Username should be of minimum 4 characters length')
		.matches(
			/^[a-z0-9_.]+$/,
			'Please remove Extra Spaces and use only lowercase letters'
		),
	mobileNumber: yup
		.string()
		.required('Mobile Number is mendatory')
		.matches(/^([+]\d{2})?\d{10}$/, 'Please enter valid mobile number '),
	dob: yup.string('Select DOB').required('DOB is required'),
	gender: yup.string('Select Gender').required('Gender is required'),
	password: yup
		.string()
		.required('Password is mendatory')
		.min(7, 'Password must be at 7 char long'),
	confirmPassword: yup
		.string()
		.required('Confirm Password is mendatory')
		.oneOf([yup.ref('password')], 'Passwords does not match'),
})

const SignUp = () => {
	const [values, setValues] = React.useState({
		showPassword: false,
	})

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userSignup = useSelector((state) => state.userSignup)

	const { error, userInfo, loading } = userSignup

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [userInfo, navigate])

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	return (
		<Box>
			<Box
				sx={{
					maxWidth: '100%',
					minHeight: '100vh',
				}}
				className='sign-up'
			>
				<Box
					sx={{
						maxWidth: '100%',
						minHeight: '100vh',
					}}
					className='signup-bg'
				>
					<Box
						className='signup-img-container'
						sx={{
							backgroundImage: `url(${bg1})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
						component={motion.div}
						initial={{ x: '100vw' }}
						animate={{ x: 0 }}
					>
						<Box className='signup-img'>
							<img src={illustration1} className='signup-img-illustration' />
							<img src={logo} className='signup-img-logo' />
						</Box>
					</Box>

					<motion.div
						className='signup-box'
						initial={{ x: '-100vw' }}
						animate={{ x: 0 }}
					>
						<Formik
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
								username: '',
								mobileNumber: '',
								dob: '',
								gender: '',
								password: '',
								confirmPassword: '',
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								dispatch(
									signup(
										values.firstName,
										values.lastName,
										values.email,
										values.username,
										values.mobileNumber,
										values.dob,
										values.gender,
										values.password
									)
								)
							}}
						>
							{({ values, handleChange, touched, errors, handleSubmit }) => (
								<Form onSubmit={handleSubmit}>
									<Typography
										sx={{ mt: 4, mb: 4 }}
										variant='h4'
										component='h1'
										fontWeight={700}
										color='secondary'
									>
										Create new Account
									</Typography>
									<Grid container spacing={3}>
										<Grid item xs={12} lg={6}>
											<TextField
												id='firstName'
												name='firstName'
												label='First Name'
												color='secondary'
												sx={{ width: '100%' }}
												value={values.firstName}
												onChange={handleChange}
												error={touched.firstName && Boolean(errors.firstName)}
												helperText={touched.firstName && errors.firstName}
											/>
										</Grid>
										<Grid item xs={12} lg={6}>
											<TextField
												label='Last Name'
												color='secondary'
												sx={{ width: '100%' }}
												id='lastName'
												name='lastName'
												value={values.lastName}
												onChange={handleChange}
												error={touched.lastName && Boolean(errors.lastName)}
												helperText={touched.lastName && errors.lastName}
											/>
										</Grid>

										<Grid item xs={12} lg={6}>
											<TextField
												name='email'
												id='email'
												label='Email'
												color='secondary'
												sx={{ width: '100%' }}
												value={values.email}
												onChange={handleChange}
												error={touched.email && Boolean(errors.email)}
												helperText={touched.email && errors.email}
											/>
										</Grid>
										<Grid item xs={12} lg={6}>
											<TextField
												label='Username'
												color='secondary'
												sx={{ width: '100%' }}
												id='username'
												name='username'
												value={values.username}
												onChange={handleChange}
												error={touched.username && Boolean(errors.username)}
												helperText={touched.username && errors.username}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												color='secondary'
												label='Mobile Number'
												sx={{ width: '100%' }}
												id='mobileNumber'
												name='mobileNumber'
												value={values.mobileNumber}
												onChange={handleChange}
												error={
													touched.mobileNumber && Boolean(errors.mobileNumber)
												}
												helperText={touched.mobileNumber && errors.mobileNumber}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControl sx={{ width: '100%' }}>
												<FormLabel
													id='demo-row-radio-buttons-group-label'
													color='secondary'
												>
													Date of Birth
												</FormLabel>
												<TextField
													color='secondary'
													type='date'
													sx={{ mt: 1, width: '100%' }}
													id='dob'
													name='dob'
													value={values.dob}
													onChange={handleChange}
													error={touched.dob && Boolean(errors.dob)}
													helperText={touched.dob && errors.dob}
												/>
											</FormControl>
										</Grid>

										<Grid item xs={12}>
											<FormControl sx={{ width: '100%' }}>
												<FormLabel color='secondary' id='gender'>
													Gender
												</FormLabel>
												<RadioGroup
													sx={{ mt: 1, width: '100%' }}
													row
													aria-labelledby='gender'
												>
													<FormControlLabel
														id='gender'
														name='gender'
														value='male'
														control={
															<Field
																type='radio'
																name='gender'
																color='secondary'
															/>
														}
														label='Male'
													/>
													<FormControlLabel
														id='gender'
														name='gender'
														value='female'
														control={
															<Field
																type='radio'
																name='gender'
																color='secondary'
															/>
														}
														label='Female'
													/>
													<FormControlLabel
														id='gender'
														name='gender'
														value='other'
														control={
															<Field
																type='radio'
																name='gender'
																color='secondary'
															/>
														}
														label='Other'
													/>
												</RadioGroup>
												<FormHelperText error id=''>
													{touched.gender && errors.gender}
												</FormHelperText>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<FormControl sx={{ width: '100%' }}>
												<InputLabel color='secondary' htmlFor='password'>
													Password
												</InputLabel>
												<OutlinedInput
													id='password'
													type={values.showPassword ? 'text' : 'password'}
													value={values.password}
													onChange={handleChange}
													error={touched.password && Boolean(errors.password)}
													name='password'
													color='secondary'
													endAdornment={
														<InputAdornment position='end'>
															<IconButton
																aria-label='toggle password visibility'
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
																edge='end'
															>
																{values.showPassword ? (
																	<VisibilityOff color='secondary' />
																) : (
																	<Visibility color='secondary' />
																)}
															</IconButton>
														</InputAdornment>
													}
													label='Password'
												/>
												<FormHelperText error id=''>
													{touched.password && errors.password}
												</FormHelperText>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<FormControl
												sx={{ mb: 3, width: '100%' }}
												variant='outlined'
											>
												<InputLabel
													color='secondary'
													htmlFor='outlined-adornment-password'
												>
													Confirm Password
												</InputLabel>
												<OutlinedInput
													id='confirmPassword'
													type={values.showPassword ? 'text' : 'password'}
													value={values.confirmPassword}
													onChange={handleChange}
													error={
														touched.confirmPassword &&
														Boolean(errors.confirmPassword)
													}
													color='secondary'
													endAdornment={
														<InputAdornment position='end'>
															<IconButton
																aria-label='toggle password visibility'
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
																edge='end'
															>
																{values.showPassword ? (
																	<VisibilityOff color='secondary' />
																) : (
																	<Visibility color='secondary' />
																)}
															</IconButton>
														</InputAdornment>
													}
													name='confirmPassword'
													label='Confirm Password'
												/>
												<FormHelperText error id=''>
													{touched.confirmPassword && errors.confirmPassword}
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
									{error && (
										<Grid item xs={12}>
											<Alert variant='outlined' severity='error'>
												{error?.response?.data?.message}
											</Alert>
										</Grid>
									)}

									{loading ? (
										<LoadingButton loading variant='outlined'>
											Submit
										</LoadingButton>
									) : (
										<Button
											type='submit'
											sx={{ mt: 2, p: 2, width: '100%' }}
											variant='contained'
											size='large'
											color='secondary'
											endIcon={<ArrowRightAltIcon />}
										>
											Sign Up
										</Button>
									)}

									<Box
										sx={{
											mt: 3,
											mb: 3,
											width: '100%',
											display: 'flex',
											justifyContent: 'center',
											gap: 1,
										}}
									>
										<span>Already have an account?</span>
										<Link href='/signin'>Sign In</Link>
									</Box>
								</Form>
							)}
						</Formik>
					</motion.div>
				</Box>
			</Box>
		</Box>
	)
}

export default SignUp
