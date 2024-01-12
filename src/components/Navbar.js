import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import logo from '../assets/images/logo-white.png'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import '../assets/styles/navbar.scss'

import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = React.useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userProfile = useSelector((state) => state.userProfile)

	const { userInfo, loading } = userProfile

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleLogout = () => {
		dispatch(logout())
		navigate('/signin', { replace: true })
	}

	return (
		<AppBar
			position='static'
			elevation={0}
			color='transparent'
			className='navbar'
		>
			<Container maxWidth='l'>
				<Toolbar>
					<Box display='flex' flexGrow={1}>
						<Link href='/'>
							<img src={logo} className='navbar-logo' />
						</Link>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Profile'>
							{loading === true ? (
								<Skeleton
									sx={{ bgcolor: 'rgba(123, 30, 162, 1)' }}
									variant='circular'
									width={40}
									height={40}
								/>
							) : (
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt={`${userInfo?.result.sFirstName} ${userInfo?.result.sLastName}`}
										src='/static/images/avatar/2.jpg'
										sx={{ bgcolor: '#50026C', color: '#fff' }}
										className='navbar-avatar'
									/>
								</IconButton>
							)}
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Link href='/profile' underline='none' color='secondary'>
									<Typography textAlign='center'>Profile</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<Typography color='secondary' textAlign='center'>
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Navbar
