import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem({ listing, id, onDelete}) {
	return (
		<li className='categoryListing'>
			<Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
				<img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' />
				<div className='categoryListingDetails'>
					<p className='categoryListingLocation'>{listing.location}</p>
					<p className='categoryListingName'>{listing.name}</p>

					<p className='categoryListingPrice'>
						$
						{listing.offer
							? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							: listing.regularePrice}
						{listing.type === 'rent' && ' / Month'}
					</p>
					<div className='categoryListingInfoDiv'>
						<img src={bedIcon} alt='bed' />
						<p className='categoryListingInfoText'>
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: `${listing.bedrooms} Bedroom`}
						</p>
						<img src={bathIcon} alt='bath' />
						<p className='categoryListingInfoText'>
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: `${listing.bathrooms} Bathrooms`}
						</p>
					</div>
				</div>
			</Link>

      {onDelete && (
        <DeleteIcon className='remove' fill='rgb(231,76,60)' onClick={() => onDelete(listing.id, listing.name)} />
      )}
		</li>
	)
}

export default ListingItem
