import React from 'react'
import TractorListingsTabs from './TractorListingsTabs'

const TractorListings = () => {
  return (
    <div className='w-[90%] mx-auto'>
        <h1 className='font-extrabold text-2xl tracking-wide w-full mt-[6rem]'>Tractor Listings</h1>
        <TractorListingsTabs/>
    </div>
  )
}

export default TractorListings