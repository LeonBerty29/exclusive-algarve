import { ContactForm } from '@/components/shared/contact-form'
import Image from 'next/image'
import React from 'react'

const YearlyPropertyTaxes = () => {
    return (
        <div>
            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap'>
                    <div className='w-full md:w-[47%] 2xl:w-[44%] space-y-6'>
                        <h1 className='text-2xl font-semibold'>YEARLY PROPERTY TAXES</h1>
                        <p>When owning real estate in Portugal</p>
                        <p className='text-neutral-700 text-sm xl:text-base mb-5 md:mb-0'>
                            Yearly property taxes when owning real estate in Portugal. <br />
                            The yearly council tax is called IMI, and for real estate with a tax value of over €600.000, there is an additional tax called the AIMI. More information about these yearly taxes below :
                        </p>
                    </div>

                    <Image priority src='/images/property-taxes-banner.png' width={646} height={484} alt='about-us' className='object-contain w-full h-72 md:w-[50%] lg:w-[47%] 2xl:w-[44%] xl:h-[390px] md:h-auto' />
                </div>
            </div>
            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='mb-10'>
                    <h2 className='text-primary text-2xl mb-7 font-semibold'>IMI</h2>

                    <div className='space-y-5'>
                        <p>In Portugal every property pays IMI tax, which is the yearly council tax owed on the property. This is calculated on the fiscal value of the property. Every council has the liberty to change within a certain level the yearly IMI rates.</p>
                        <p>In 2024 the councils can charge between 0,30 and 0.5% of the fiscal value of your property. This fiscal value is generally lower than your purchase price. For rustic land, this rate can go up to 0,8% .</p>
                        <p>To stimulate the redevelopment or sale of ruins and derelict properties in various town centres, some councils will apply higher council taxes. This can go up to 6 x times the normal IMI rate.</p>
                        <p>
                            The property tax for properties up to euro 100.000 is payable in May <br />
                            Properties with values between euro 100.000 and 500.000 are payable in two tranches - 50% in May and 50% in November.</p>
                        <p>For properties with a fiscal value above euro 500.000, the payments are made in 3 tranches - May, August and November.</p>
                    </div>
                </div>

                <div className='mb-10'>
                    <h2 className='text-primary text-2xl mb-7 font-semibold'>AIMI</h2>

                    <div className='space-y-5'>
                        <p>
                            Since 2017 a new, additional IMI has been introduced called the AIMI (additional IMI tax)<br />
                            The AIMI tax is applicable to private persons but also companies. Exemptions include: commercial real estate, business, industry and services.
                        </p>

                        <div className='space-y-1'>
                            <h3 className='text-lg font-semibold'>Tax table for AIMI</h3>
                            <p>The AIMI tax is calculated on top of the IMI tax and calculated on the rateable value of your property.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='max-w-[800px] mx-auto'>
                    <ContactForm theme='light' titleStyling='text-center' submitBtnStyling='flex mx-auto' />
                </div>
            </div>
        </div>
    )
}

export default YearlyPropertyTaxes