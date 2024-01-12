import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import '../assets/styles/signin.scss'
import bg1 from '../assets/images/bg1.jpg'
import illustration1 from '../assets/images/illustration1.png'
import logo from '../assets/images/logo-colorful.png'
import { motion } from 'framer-motion'
import {
	Alert,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin } from '../store/actions/userActions'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is mendatory')
		.min(7, 'Password must be at 7 char long'),
})

// error.response.data.message

const SignIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userSignin = useSelector((state) => state.userSignIn)

	const token = localStorage.getItem('token')

	const { error, loading } = userSignin

	useEffect(() => {
		if (token !== null) {
			navigate('/')
		}
	}, [token])

	const formik = useFormik({
		initialValues: {
			password: '',
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			dispatch(signin(values.email, values.password))
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
			}}
			className='sign-in'
		>
			<Box
				sx={{
					maxWidth: '100%',
					minHeight: '100vh',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='signin-bg'
			>
				<motion.form
					className='signin-box'
					initial={{ x: '100vw' }}
					animate={{ x: 0 }}
					onSubmit={formik.handleSubmit}
				>
					<Typography
						sx={{ mt: 4, mb: 4 }}
						variant='h4'
						component='h1'
						color='secondary'
						fontWeight={700}
					>
						Sign In
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								color='secondary'
								label='Email'
								sx={{ width: '100%' }}
								name='email'
								id='email'
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
								<InputLabel
									color='secondary'
									htmlFor='outlined-adornment-password'
								>
									Password
								</InputLabel>
								<OutlinedInput
									id='password'
									type={values.showPassword ? 'text' : 'password'}
									value={formik.values.password}
									onChange={formik.handleChange}
									error={
										formik.touched.password && Boolean(formik.errors.password)
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
									name='password'
									label='Password'
								/>
								<FormHelperText error id=''>
									{formik.touched.password && formik.errors.password}
								</FormHelperText>
							</FormControl>
							{error && (
								<Grid item xs={12}>
									<Alert variant='outlined' severity='error'>
										{error?.response?.data?.message}
									</Alert>
								</Grid>
							)}
						</Grid>
						<Grid item xs={12}>
							<Link href='/forgotpassword' sx={{ textAlign: 'right' }}>
								<span>Forgot Password?</span>
							</Link>
						</Grid>
					</Grid>

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
							endIcon={<ArrowRightAltIcon />}
							color='secondary'
						>
							Sign In
						</Button>
					)}

					<Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
						<span>Don&apos;t have an Account?</span>
						<Link href='/signup'>
							<span>Create a new Account</span>
						</Link>
					</Box>
				</motion.form>
				<Box
					className='signup-img-container'
					sx={{
						backgroundImage: `url(${bg1})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
					component={motion.div}
					initial={{ x: '-100vw' }}
					animate={{ x: 0 }}
				>
					<Box className='signin-img'>
						<img src={illustration1} className='signin-img-illustration' />
						<img src={logo} className='signin-img-logo' />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default SignIn
