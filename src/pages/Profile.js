import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Link,
	Typography,
} from '@mui/material'
import React from 'react'
import '../assets/styles/home.scss'
import Navbar from '../components/Navbar'
import '../assets/styles/profile.scss'
import bg1 from '../assets/images/bg1.jpg'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import WcIcon from '@mui/icons-material/Wc'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import EditIcon from '@mui/icons-material/Edit'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Profile = () => {
	const userProfile = useSelector((state) => state.userProfile)

	const { userInfo, loading } = userProfile

	return (
		<Box
			className='profile'
			sx={{
				maxWidth: '100%',
				minHeight: '100vh',
				backgroundImage: `url(${bg1})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Box className='profile-container' sx={{ pb: 6 }}>
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
					>
						<CircularProgress thickness={3} size={70} color='secondary' />
					</Box>
				) : (
					<Container
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box className='profile-name'>
							<Avatar
								alt={userInfo?.result.sFirstName}
								src='/static/images/avatar/2.jpg'
								sx={{
									bgcolor: '#50026C',
									color: '#fff',
									width: 72,
									height: 72,
									fontSize: '24px',
								}}
								className='navbar-avatar'
							/>
							<Typography
								variant='h4'
								color='secondary'
								fontWeight={600}
								component='h5'
							>
								{`${userInfo?.result.sFirstName} ${userInfo?.result.sLastName}`}
							</Typography>
						</Box>
						<Box className='profile-btns'>
							<Link href='/editprofile' underline='none'>
								<Button
									color='secondary'
									variant='outlined'
									endIcon={<EditIcon />}
								>
									Edit Profile
								</Button>
							</Link>
							<Link href='/changepassword' underline='none'>
								<Button
									color='secondary'
									variant='outlined'
									endIcon={<LockOpenIcon />}
								>
									Change Password
								</Button>
							</Link>
						</Box>
						<Container sx={{ mt: 4 }}>
							<Grid
								container
								rowSpacing={{ xs: 1, sm: 2, md: 3 }}
								columnSpacing={{ xs: 1, sm: 2, md: 3 }}
								className='profile-info'
							>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<PersonIcon />
										<Typography variant='h6'>{`${userInfo?.result.sFirstName} ${userInfo?.result.sLastName}`}</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<EmailIcon />
										<Typography variant='h6'>
											{userInfo?.result.sEmail}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<AccountCircleIcon />
										<Typography variant='h6'>
											@{userInfo?.result.sUserName}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<PhoneIphoneIcon />
										<Typography variant='h6'>
											{userInfo?.result.nMobile}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<CalendarMonthIcon />
										<Typography variant='h6'>
											{moment(userInfo?.result.sDateOfBirth).format('ll')}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Box className='profile-info-box'>
										<WcIcon />
										<Typography variant='h6'>
											{userInfo?.result.sGender}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Container>
					</Container>
				)}
			</Box>
		</Box>
	)
}

export default Profile
