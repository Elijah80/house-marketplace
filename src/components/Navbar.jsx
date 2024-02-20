import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
	const navLinks = [
		{ path: '/', icon: <ExploreIcon />, text: 'Explore' },
		{ path: '/offers', icon: <OfferIcon />, text: 'Offers' },
		{ path: '/profile', icon: <PersonOutlineIcon />, text: 'Profile' },
	]
	const navigate = useNavigate()
	const location = useLocation()

	const pathMatchRoute = route => {
		if (route === location.pathname) {
			return true
		}
	}

	return (
		<footer className='navbar'>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					{navLinks.map(({ path, icon: Icon, text }) => (
						<li key={path} className='navbarListItem' onClick={() => navigate(path)}>
							{React.cloneElement(Icon, {
								fill: pathMatchRoute(path) ? '#2c2c2c' : '#8f8f8f',
								width: '36px',
								height: '36px',
							})}
							<p
								className={
									pathMatchRoute(path) ? 'navbarListItemNameActive' : 'navbarListItemName'
								}
							>
								{text}
							</p>
						</li>
					))}
				</ul>
			</nav>
		</footer>
	)
}

export default Navbar
