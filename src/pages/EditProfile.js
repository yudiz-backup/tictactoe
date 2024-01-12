import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import '../assets/styles/editprofile.scss'

import {
	Alert,
	Button,
	CircularProgress,
	Container,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Navbar from '../components/Navbar'
import bg1 from '../assets/images/bg1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { editProfile } from '../store/actions/profileActions'
import LoadingButton from '@mui/lab/LoadingButton'

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
})

const EditProfile = () => {
	const dispatch = useDispatch()
	const userProfile = useSelector((state) => state.userProfile)
	const { userInfo, loading } = userProfile
	const dateMatch = moment(userInfo?.result.sDateOfBirth).format('yyyy-MM-DD')
	const token = localStorage.getItem('token')

	const getEditProfile = useSelector((state) => state.editProfile)

	const { error, editProfileInfo, editLoading } = getEditProfile

	useEffect(() => {}, [])

	return (
		<Box
			sx={{
				maxWidth: '100%',
				minHeight: '100vh',
				backgroundImage: `url(${bg1})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			className='editprofile'
		>
			<Box className='editprofile-container'>
				<Navbar />
				{loading == true ? (
					<Box
						sx={{
							maxWidth: '100%',
							minHeight: '80vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						className='editprofile-bg'
					>
						<CircularProgress thickness={3} size={70} color='secondary' />
					</Box>
				) : (
					<Box
						sx={{
							maxWidth: '100%',
							minHeight: '100%',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							px: '32px',
						}}
						className='editprofile-bg'
					>
						<Formik
							initialValues={{
								firstName: userInfo?.result?.sFirstName,
								lastName: userInfo?.result?.sLastName,
								username: userInfo?.result?.sUserName,
								mobileNumber: userInfo?.result?.nMobile,
								dob: dateMatch,
								gender: userInfo?.result?.sGender,
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								dispatch(
									editProfile(
										values.firstName,
										values.lastName,
										values.username,
										values.mobileNumber,
										values.dob,
										values.gender,
										token
									)
								)
							}}
						>
							{({ values, handleChange, touched, errors, handleSubmit }) => (
								<Form onSubmit={handleSubmit}>
									<Container className='editprofile-box'>
										<Typography
											sx={{ mt: 4, mb: 4 }}
											variant='h4'
											component='h1'
											fontWeight={700}
											color='secondary'
										>
											Edit Profile
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
													focused
												/>
											</Grid>
											<Grid item xs={12} lg={6}>
												<TextField
													label='Last Name'
													id='lastName'
													name='lastName'
													color='secondary'
													sx={{ width: '100%' }}
													value={values.lastName}
													onChange={handleChange}
													error={touched.lastName && Boolean(errors.lastName)}
													helperText={touched.lastName && errors.lastName}
													focused
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
													focused
												/>
											</Grid>
											<Grid item xs={12} lg={6}>
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
													helperText={
														touched.mobileNumber && errors.mobileNumber
													}
													focused
												/>
											</Grid>
											<Grid item xs={12}>
												<FormControl sx={{ width: '100%' }} color='secondary'>
													<FormLabel
														color='secondary'
														id='demo-row-radio-buttons-group-label'
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
														focused
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
												{error && (
													<Grid item xs={12}>
														<Alert variant='outlined' severity='error'>
															{error?.response?.data?.message}
														</Alert>
													</Grid>
												)}
												{editProfileInfo && (
													<Grid item xs={12}>
														<Alert variant='outlined' severity='success'>
															{editProfileInfo?.message}
														</Alert>
													</Grid>
												)}
											</Grid>
										</Grid>

										{editLoading ? (
											<LoadingButton
												loading
												sx={{
													mt: 3,
													mb: 3,
													p: 2,
													width: '100%',
													bgcolor: 'rgba(123, 30, 162, 1)',
												}}
												variant='contained'
												color='info'
												size='large'
											>
												loading
											</LoadingButton>
										) : (
											<Button
												type='submit'
												color='secondary'
												sx={{ mt: 2, p: 2, width: '100%' }}
												variant='contained'
												size='large'
												endIcon={<ArrowRightAltIcon />}
											>
												Edit Profile
											</Button>
										)}
									</Container>
								</Form>
							)}
						</Formik>
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default EditProfile
