import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
	return (
		<div className='explore'>
			<header>
				<p className='pageHeader'>Explore</p>
			</header>

			<main>
				{/* TODO: Add Slider */}
				<p className='exploreCategoryHeading'>Categories</p>
				<div className='exploreCategories'>
					<Link to='/category/rent'>
						<img src={rentCategoryImage} alt='For Rent' className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for Rent</p>
					</Link>
          <Link to='/category/sale'>
						<img src={sellCategoryImage} alt='For Sale' className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for Sale</p>
					</Link>
				</div>
			</main>
		</div>
	)
}

export default Explore
