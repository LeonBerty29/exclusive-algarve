import React from 'react'
import { Button } from '../ui/button'
import CarouselSliderVertical from '../carousel-slider-vertical'

const AwardsSection = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-4 container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 sm:justify-between sm:items-center'>
            <div className='py-24'>
                <p className='text-xs font-medium mb-7'>WE&apos;VE MADE IT FOR YOU</p>
                <h2 className='text-4xl font-normal max-w-lg mb-12 text-primary'>
                    The best luxury lifestyle agency in Algarve
                </h2>
                <Button className='bg-black text-white rounded-none py-5 text-sm font-normal'>
                    CONTACT US NOW
                </Button>
            </div>
            <div className='flex gap-4'>
                <CarouselSliderVertical direction='down' />
                <CarouselSliderVertical />
            </div>

        </div>
    )
}

export default AwardsSection