import { Box } from '@mui/material'
import React from 'react'
import '../assets/styles/home.scss'
import Navbar from '../components/Navbar'
import '../assets/styles/home.scss'
import bg1 from '../assets/images/bg1.jpg'

const Home = () => {
	return (
		<Box
			className='home'
			sx={{
				maxWidth: '100%',
				minHeight: '100vh',
				backgroundImage: `url(${bg1})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Box className='home-container'>
				<Navbar />
			</Box>
		</Box>
	)
}

export default Home
