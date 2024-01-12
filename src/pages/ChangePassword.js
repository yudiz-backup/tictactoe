import React from 'react'
import Box from '@mui/material/Box'
import '../assets/styles/changepassword.scss'
import bg1 from '../assets/images/bg1.jpg'
import {
	Alert,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Navbar from '../components/Navbar'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../store/actions/passwordActions.js'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
	oldPassword: yup
		.string()
		.required('Old Password is mendatory')
		.min(7, 'Old Password must be at 7 char long'),
	newPassword: yup
		.string()
		.required('New Password is mendatory')
		.min(7, 'New Password must be at 7 char long'),
	confirmNewPassword: yup
		.string()
		.required('Confirm New Password is mendatory')
		.oneOf([yup.ref('newPassword')], 'New Passwords does not match'),
})

const ChangePassword = () => {
	const dispatch = useDispatch()
	const getChangePassword = useSelector((state) => state.changePassword)

	const token = localStorage.getItem('token')

	const { error, changePasswordSuccess, loading } = getChangePassword

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(changePassword(values.oldPassword, values.newPassword, token))
		},
	})
	const [values, setValues] = React.useState({
		showPassword: false,
	})

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
		<Box
			sx={{
				maxWidth: '100%',
				minHeight: '100vh',
				backgroundImage: `url(${bg1})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			className='changepassword'
		>
			<Box
				sx={{
					maxWidth: '100%',
					minHeight: '100vh',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='changepassword-bg'
			>
				<Navbar />

				<Container className='changepassword-box'>
					<Container>
						<form onSubmit={formik.handleSubmit}>
							<Grid
								container
								alignItems='center'
								justifyContent='center'
								spacing={3}
							>
								<Grid item xs={12} lg={8}>
									<Typography
										sx={{ mt: 4, mb: 2 }}
										variant='h4'
										component='h1'
										fontWeight={700}
										color='secondary'
									>
										Change Password
									</Typography>
								</Grid>
								<Grid item xs={12} lg={8}>
									<FormControl sx={{ width: '100%' }} variant='outlined'>
										<InputLabel
											color='secondary'
											htmlFor='outlined-adornment-password'
										>
											Old Password
										</InputLabel>
										<OutlinedInput
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
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
											label='Old Password'
											id='oldPassword'
											type={values.showPassword ? 'text' : 'password'}
											value={formik.values.oldPassword}
											onChange={formik.handleChange}
											error={
												formik.touched.oldPassword &&
												Boolean(formik.errors.oldPassword)
											}
											name='oldPassword'
										/>
										<FormHelperText error id=''>
											{formik.touched.oldPassword && formik.errors.oldPassword}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item xs={12} lg={8}>
									<FormControl sx={{ width: '100%' }} variant='outlined'>
										<InputLabel
											color='secondary'
											htmlFor='outlined-adornment-password'
										>
											New Password
										</InputLabel>
										<OutlinedInput
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
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
											label='New Password'
											id='newPassword'
											type={values.newPassword ? 'text' : 'password'}
											value={formik.values.newPassword}
											onChange={formik.handleChange}
											error={
												formik.touched.newPassword &&
												Boolean(formik.errors.newPassword)
											}
											name='newPassword'
										/>
										<FormHelperText error id=''>
											{formik.touched.newPassword && formik.errors.newPassword}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item xs={12} lg={8}>
									<FormControl
										color='secondary'
										sx={{ width: '100%' }}
										variant='outlined'
									>
										<InputLabel
											color='secondary'
											htmlFor='outlined-adornment-password'
										>
											Confirm New Password
										</InputLabel>
										<OutlinedInput
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge='end'
													>
														{values.showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
											label='Confirm New Password'
											id='confirmNewPassword'
											type={values.confirmNewPassword ? 'text' : 'password'}
											value={formik.values.confirmNewPassword}
											onChange={formik.handleChange}
											error={
												formik.touched.confirmNewPassword &&
												Boolean(formik.errors.confirmNewPassword)
											}
											name='confirmNewPassword'
										/>
										<FormHelperText error id=''>
											{formik.touched.confirmNewPassword &&
												formik.errors.confirmNewPassword}
										</FormHelperText>
									</FormControl>
								</Grid>
								{error && (
									<Grid item xs={12} lg={8}>
										<Alert variant='outlined' severity='error'>
											{error?.response?.data?.message}
										</Alert>
									</Grid>
								)}
								{changePasswordSuccess && (
									<Grid item xs={12} lg={8}>
										<Alert variant='outlined' severity='success'>
											{changePasswordSuccess?.message}
										</Alert>{' '}
									</Grid>
								)}
								<Grid item xs={12} lg={8}>
									{loading ? (
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
											sx={{ mt: 3, mb: 3, p: 2, width: '100%' }}
											variant='contained'
											size='large'
											color='secondary'
											endIcon={<ArrowRightAltIcon />}
										>
											Reset
										</Button>
									)}
								</Grid>
							</Grid>
						</form>
					</Container>
				</Container>
			</Box>
		</Box>
	)
}

export default ChangePassword
