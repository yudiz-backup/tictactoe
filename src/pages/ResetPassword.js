import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import '../assets/styles/resetpassword.scss'
import bg1 from '../assets/images/bg1.jpg'
import {
	Alert,
	Button,
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
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../store/actions/passwordActions.js'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
	password: yup
		.string()
		.required('Password is mendatory')
		.min(7, 'Password must be at 7 char long'),
	confirmPassword: yup
		.string()
		.required('Confirm Password is mendatory')
		.oneOf([yup.ref('password')], 'Passwords does not match'),
})

const ResetPassword = () => {
	const [getParams] = useSearchParams()
	const dispatch = useDispatch()
	const token = getParams.get('token')
	const navigate = useNavigate()
	const getResetPassword = useSelector((state) => state.resetPassword)

	const { error, resetPasswordSuccess, loading } = getResetPassword
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: (value) => {
			dispatch(resetPassword(token, value.password))
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

	useEffect(() => {
		getParams.get('token') === null && navigate('/signin')
	}, [getParams.get('token')])

	useEffect(() => {
		resetPasswordSuccess && navigate('/signin')
	}, [resetPasswordSuccess])

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
			className='resetpassword'
		>
			<Box
				sx={{
					maxWidth: '100%',
					height: '100vh',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='resetpassword-bg'
			>
				<Box className='resetpassword-box'>
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
									Reset Password
								</Typography>
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
										id='password'
										type={values.showPassword ? 'text' : 'password'}
										value={formik.values.password}
										onChange={formik.handleChange}
										error={
											formik.touched.password && Boolean(formik.errors.password)
										}
										name='password'
									/>
									<FormHelperText error id=''>
										{formik.touched.password && formik.errors.password}
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
										id='confirmPassword'
										type={values.showPassword ? 'text' : 'password'}
										value={formik.values.confirmPassword}
										onChange={formik.handleChange}
										error={
											formik.touched.confirmPassword &&
											Boolean(formik.errors.confirmPassword)
										}
										name='confirmPassword'
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
									/>
									<FormHelperText error id=''>
										{formik.touched.confirmPassword &&
											formik.errors.confirmPassword}
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
							{resetPasswordSuccess && (
								<Grid item xs={12} lg={8}>
									<Alert variant='outlined' severity='success'>
										{resetPasswordSuccess?.message}
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
				</Box>
			</Box>
		</Box>
	)
}

export default ResetPassword
