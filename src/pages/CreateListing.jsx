import React, { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function CreateListing() {
	const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: {},
		lat: 0,
		lng: 0,
	})

	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		offer,
		regularPrice,
		discountedPrice,
		images,
		lat,
		lng,
	} = formData

	const auth = getAuth()
	const navigate = useNavigate()
	const isMounted = useRef(true)

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, user => {
				if (user) {
					setFormData({ ...formData, userRef: user.uid })
				} else {
					navigate('/sign-in')
				}
			})
		}

		return () => {
			isMounted.current = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted])

	const onSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		if (discountedPrice >= regularPrice) {
			setLoading(false)
			toast.error('Discounted price must be lower than the regular price')
			return
		}

		if (images.length > 6) {
			setLoading(false)
			toast.error('You can only upload 6 images')
			return
		}

		let geolocation = {}
		let location

		if (geoLocationEnabled) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
			)

			const data = await response.json()

			geolocation = data.results[0]?.geometry.location.lat ?? 0
			geolocation = data.results[0]?.geometry.location.lng ?? 0

			location = data.status === 'ZERO_RESULTS' ? 'unknown' : data.results[0]?.formatted_address

      if(location === 'unknown' || location.includes('undefined')) {
        setLoading(false)
        toast.error('Please enter a valid address')
        return
      }
		} else {
			geolocation.lat = lat
			geolocation.lng = lng
			location = address
		}

		setLoading(false)
	}

	const onMutate = e => {
		let boolean = null

		if (e.target.value === 'true') {
			boolean = true
		}

		if (e.target.value === 'false') {
			boolean = false
		}

		// Files
		if (e.target.files) {
			setFormData(prevState => ({
				...prevState,
				images: e.target.files,
			}))
		}

		// Text/Booleans/Numbers
		if (!e.target.files) {
			setFormData(prevState => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}))
		}
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div className='profile'>
			<header>
				<p className='pageHeader'>Create A Listing</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<label className='formLabel'>Sell / Rent</label>
					<div className='formButtons'>
						<button
							type='button'
							className={type === 'sale' ? 'formButtonActive' : 'formButton'}
							id='type'
							value='sale'
							onClick={onMutate}
						>
							Sell
						</button>
						<button
							type='button'
							className={type === 'rent' ? 'formButtonActive' : 'formButton'}
							id='type'
							value='rent'
							onClick={onMutate}
						>
							Rent
						</button>
					</div>

					<label className='formLabel'>Name</label>
					<input
						type='text'
						id='name'
						className='formInputName'
						value={name}
						onChange={onMutate}
						maxLength='32'
						minLength='10'
						required
					/>

					<div className='formRooms flex'>
						<div>
							<label className='formLabel'>Bedrooms</label>
							<input
								type='number'
								className='formInputSmall'
								id='bedrooms'
								value={bedrooms}
								onChange={onMutate}
								min='1'
								max='50'
								required
							/>
						</div>
						<div>
							<label className='formLabel'>Bathrooms</label>
							<input
								type='number'
								id='bathrooms'
								className='formInputSmall'
								value={bathrooms}
								onChange={onMutate}
								min='1'
								max='50'
								required
							/>
						</div>
					</div>

					<label className='formLabel'>Parking Available</label>
					<div className='formButtons'>
						<button
							type='button'
							className={parking ? 'formButtonActive' : 'formButton'}
							id='parking'
							value={true}
							onClick={onMutate}
							min='1'
							max='50'
						>
							Yes
						</button>
						<button
							type='button'
							className={!parking && parking !== null ? 'formButtonActive' : 'formButton'}
							id='parking'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Furnished</label>
					<div className='formButtons'>
						<button
							type='button'
							className={furnished ? 'formButtonActive' : 'formButton'}
							id='furnished'
							value={true}
							onClick={onMutate}
						>
							Yes
						</button>
						<button
							type='button'
							className={!furnished && furnished !== null ? 'formButtonActive' : 'formButton'}
							id='furnished'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Address</label>
					<textarea
						type='text'
						className='formInputAddress'
						id='address'
						value={address}
						onChange={onMutate}
						required
					/>

					{!geoLocationEnabled && (
						<div className='formLatLng flex'>
							<div>
								<label className='formLabel'>Latitude</label>
								<input
									type='number'
									id='latitude'
									className='formInputSmall'
									value={lat}
									onChange={onMutate}
									required
								/>
							</div>
							<div>
								<label className='formLabel'>Longitude</label>
								<input
									type='number'
									id='longitude'
									className='formInputSmall'
									value={lng}
									onChange={onMutate}
									required
								/>
							</div>
						</div>
					)}

					<label className='formLabel'>Offer</label>
					<div className='formButtons'>
						<button
							type='button'
							className={offer ? 'formButtonActive' : 'formButton'}
							id='offer'
							value={true}
							onClick={onMutate}
						>
							Yes
						</button>
						<button
							type='button'
							className={!offer && offer !== null ? 'formButtonActive' : 'formButton'}
							id='offer'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Regular Price</label>
					<div className='formPriceDiv'>
						<input
							type='number'
							id='regularPrice'
							className='formInputSmall'
							value={regularPrice}
							onChange={onMutate}
							min='50'
							max='750000000'
							required
						/>
						{type === 'rent' && <p className='formPriceText'>$ / Month</p>}
					</div>

					{offer && (
						<>
							<label className='formLabel'>Discounted Price</label>
							<input
								type='number'
								id='discountedPrice'
								className='formInputSmall'
								value={discountedPrice}
								onChange={onMutate}
								min='50'
								max='750000000'
								required={offer}
							/>
						</>
					)}

					<label className='formLabel'>Images</label>
					<p className='imagesInfo'>The first image will be the cover (max 6).</p>
					<input
						type='file'
						id='images'
						className='formInputFile'
						onChange={onMutate}
						max='6'
						accept='.jpg,.png,.jpeg'
						multiple
						required
					/>

					<button type='submit' className='primaryButton createListingButton'>
						Create Listing
					</button>
				</form>
			</main>
		</div>
	)
}

export default CreateListing
