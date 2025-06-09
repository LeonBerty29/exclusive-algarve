import Link from 'next/link'
import React from 'react'
import { NewsletterForm } from './newsletter-form'
import { MessageForm } from './message-us-form'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className='bg-neutral-900'>
            <div className='text-white container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20 !pb-0'>
                <div className='flex items-start gap-28 flex-wrap gap-y-12'>
                    <div className='flex-1 min-w-0 sm:min-w-[380px] md:min-w-[500px] lg:min-w-[600px]'>
                        <h3 className='mb-10 font-light text-xl md:text-2xl lg:text-3xl'>OUR OFFICES</h3>

                        <div className='flex items-start flex-wrap gap-4 justify-between gap-y-10'>
                            <div className='max-w-[285px] min-w-[220px]'>
                                <ul className='space-y-6 list-none'>
                                    <li>
                                        <h4 className='text-sm text-primary font-light uppercase mb-3'>Vilamoura</h4>
                                        <p className='text-xs font-light w-full md:w-[80%]'>Av.Tivoli, B, Bloco 3, R/C Esq8125-410 Vilamoura</p>
                                    </li>
                                    <li>
                                        <h4 className='text-sm text-primary font-light uppercase mb-3'>lagoa</h4>
                                        <p className='text-xs font-light w-full md:w-[80%]'>R. Ernesto Cabrita, Edif. Vales, Loja A8400-387 Lagoa</p>
                                    </li>
                                    <li>
                                        <h4 className='text-sm text-primary font-light uppercase mb-3'>lagos</h4>
                                        <p className='text-xs font-light w-full md:w-[80%]'>R. Ernesto Cabrita, Edif. Vales, Loja A8400-387 Lagoa</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='min-w-[200px] w-fit max-w-[285px]'>
                                <h4 className='text-sm text-primary font-light uppercase mb-3'>Navigation</h4>
                                <ul className='space-y-4 list-none'>
                                    <li>
                                        <Link href="/" className='text-xs font-light'>Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/search" className='text-xs font-light'>Properties</Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us" className='text-xs font-light'>About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className='text-xs font-light'>Blog</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='min-w-[200px] w-fit max-w-[285px]'>
                                <h4 className='text-sm text-primary font-light uppercase mb-3'>Resources</h4>
                                <ul className='space-y-4 list-none'>
                                    <li>
                                        <Link href="/become-a-vendor" className='text-xs font-light'>Become a vendor</Link>
                                    </li>
                                    <li>
                                        <Link href="/yearly-property-taxes" className='text-xs font-light'>Portugal properties taxes</Link>
                                    </li>
                                    <li>
                                        <Link href="/buying-process" className='text-xs font-light'>Buying process</Link>
                                    </li>
                                    <li>
                                        <Link href="/digital-nomad-visa" className='text-xs font-light'>Digital Nomad Visa</Link>
                                    </li>
                                    <li>
                                        <Link href="/golden-visa-program" className='text-xs font-light'>Golden Visa Program</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[430px] w-full'>
                        <h3 className='mb-5 font-light text-xl md:text-2xl lg:text-3xl uppercase'>Subscribe to our NewsLETTERS</h3>
                        <NewsletterForm />

                        <div className='mt-10 w-full'>
                            <h3 className='mb-5 font-light text-xl md:text-2xl uppercase'>Message Us</h3>
                            <MessageForm />
                        </div>
                    </div>

                </div>

                <div className='w-full mt-28'>
                    <Image src="/images/logo-exclusive.svg" width={150} height={50} alt="Logo" className='object-contain w-full h-auto' />
                </div>
            </div>

            <div className='bg-gray-200 p-8'>
                <p className='text-center text-xs font-light text-neutral-700'>© 2025 Exclusive Living Mediaçao Imobiliaria Lda. Ami 7516</p>
            </div>
        </div>
    )
}

export default Footer