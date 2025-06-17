import DiscoverSection from '@/components/home/discover-section'
import { ContactSection } from '@/components/shared/contact-section'
import Image from 'next/image'
import React from 'react'

const ContactPage = () => {
    return (
        <>
            <div className='pt-24'>
                <ContactSection title='CONTACT US' imageSrc='' theme='light' formTitle={false} />
            </div>

            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap'>
                    <div className='w-full md:w-[47%] 2xl:w-[44%]'>
                        <h1 className='text-2xl font-semibold mb-6'>BOOK A MEETING WITH US</h1>
                        <p className='text-neutral-700 text-sm xl:text-base mb-5 md:mb-0'>
                            Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006. With many years of experience, we lead a team of property professionals who are knowledgeable in their work area and will be dedicated to show you all the ins and outs of the Algarve region.
                        </p>
                    </div>

                    <Image src='/images/recent-listing-3.png' width={450} height={450} alt='about-us' className='object-cover w-full h-72 md:w-[50%] lg:w-[47%] 2xl:w-[44%] xl:h-[390px] md:h-auto' />
                </div>
            </div>

            <DiscoverSection />
        </>


    )
}

export default ContactPage