import React from 'react'
import Box from '@mui/material/Box'
import '../assets/styles/forgotpassword.scss'
import bg1 from '../assets/images/bg1.jpg'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../store/actions/passwordActions.js'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
})

const ForgotPassword = () => {
	const dispatch = useDispatch()
	const getForgotPassword = useSelector((state) => state.forgotPassword)

	const { error, forgotPasswordSuccess, loading } = getForgotPassword

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: (value) => {
			dispatch(forgotPassword(value.email))
		},
	})
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
			className='forgotpassword'
		>
			<Box
				sx={{
					maxWidth: '100%',
					height: '100vh',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='forgotpassword-bg'
			>
				<Box className='forgotpassword-box'>
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
									Forgot Password
								</Typography>
							</Grid>
							<Grid item xs={12} lg={8}>
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

							{error && (
								<Grid item xs={12} lg={8}>
									<Alert variant='outlined' severity='error'>
										{error?.response?.data?.message}
									</Alert>
								</Grid>
							)}
							{forgotPasswordSuccess && (
								<Grid item xs={12} lg={8}>
									<Alert variant='outlined' severity='success'>
										{forgotPasswordSuccess?.message}
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
										color='secondary'
										size='large'
										endIcon={<ArrowRightAltIcon />}
									>
										Submit
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

export default ForgotPassword
