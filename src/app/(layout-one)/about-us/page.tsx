import Image from 'next/image'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils'
import DiscoverSection from '@/components/home/discover-section'
import { ContactSection } from '@/components/shared/contact-section'

const AboutUs = () => {

    const testimonials = [
        {
            id: "qwqwqwqwqwqw-232",
            name: "Conrad",
            message: "We recently bought a house in Lagos through Exclusive Algarve Villas. Our agents were Melissa and Carolina. When buying a property I have high expectations and both Melissa and Carolina showed their professionalism and skills that helped the whole process go smoothly. They did what they said they would do, and they were also lovely people to work with, and that's important. I highly recommend them.",
            imageUrl: "/images/recent-listing-1.png",
            date: "May 2025",
        },
        {
            id: "qwqwqwqwqwqw-235",
            name: "Frans",
            message: "We were very happy with the honest, open and professional help from EAVillas to sell our house. For both us and the buyers it was a stress free proces, thanks to them. Also great after sales service to complete the positive experience. Much better agency than the prime international agencies.",
            imageUrl: "/images/recent-listing-2.png",
            date: "February 2025",
        },
        {
            id: "qwqwqwqwqwqw-237",
            name: "Hanam Najma",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ante vel ante bibendum facilisis. Nullam nec ante vel ante bibendum facilisis.",
            imageUrl: "/images/recent-listing-3.png",
            date: "June 2025",
        },
        {
            id: "qwqwqwqwqwqw-765",
            name: "John",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ante vel ante bibendum facilisis. Nullam nec ante vel ante bibendum facilisis.",
            imageUrl: "/images/recent-listing-3.png",
            date: "October 2025",
        },
        {
            id: "qwqwqwqwqwqw-6321",
            name: "Ofon",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ante vel ante bibendum facilisis. Nullam nec ante vel ante bibendum facilisis.",
            imageUrl: "/images/recent-listing-3.png",
        },
    ]
    return (
        <>
            <div className='max-w-[1350px] mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-12'>
                <div className='flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap'>
                    <div className='w-full md:w-[50%] md:pr-8 lg:pr-14'>
                        <h1 className='text-2xl lg:text-3xl font-normal sm:max-w-70 mb-6'>ABOUT EXCLUSIVE ALGARVE VILLAS</h1>
                        <p className='text-neutral-700 text-sm xl:text-base mb-5 md:mb-0'>
                            Exclusive Algarve Villas has been a known name in the sale of luxurious and unique Properties in the Western and Central Algarve since 2006. With many years of experience, we lead a team of property professionals who are knowledgeable in their work area and will be dedicated to show you all the ins and outs of the Algarve region.
                        </p>
                    </div>

                    <Image priority src='/images/recent-listing-3.png' width={450} height={450} alt='about-us' className='object-cover w-full h-72 md:w-[50%]  xl:h-[390px] md:h-auto' />
                </div>

                <div className='flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap'>
                    <Image priority src='/images/recent-listing-3.png' width={450} height={450} alt='about-us' className='object-cover w-full h-72 md:w-[50%]  xl:h-[390px] md:h-auto order-2 md:prder-1' />

                    <div className='w-full md:w-[50%] lg:min-w-[unset] md:pl-8 lg:pl-14 order-1 md:order-2'>
                        <h1 className='text-2xl lg:text-3xl font-normal sm:max-w-70 mb-6'>MEET <br /> THE TEAM</h1>
                        <p className='text-neutral-700 text-sm xl:text-base mb-5 md:mb-0'>
                            Directors Marcela Boturao & Bart van Linden would like to welcome you to meet the team of Exclusive Algarve Villas. Both Marcela and Bart have been active in selling luxury real estate in the Algarve for over a decade. They have built up a multi award winning company and continue to grow the business year after year.
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg-neutral-800 text-white'>
                <div className='max-w-[1350px] mx-auto px-6 md:px-12 lg:px-14 py-14'>
                    <div className='flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap'>
                        <div className='w-full lg:w-[50%] md:pr-8 lg:pr-14'>
                            <h2 className='text-xl lg:text-2xl font-normal sm:max-w-70 mb-6'>OUR <span className='text-primary'>CLIENTS</span> <br /> TESTIMONIALS</h2>
                            <p className='text-white/70 text-sm xl:text-base mb-5'>
                                Exclusive Algarve Villas has won various awards over the years, from &quot;Best Real Estate Agency Website&quot; to <span className='text-white'>&quot;Best Real Estate Agency Portugal&quot;</span> by the International Property Awards in London. Furthermore has also won an award in 2019 by Best Luxury Real Estate Agency 2019 by Build Magazine.
                            </p>
                        </div>

                        <div className='lg:pl-3 w-full lg:w-[50%]'>
                            <Carousel
                                className="w-full"
                                opts={{
                                    align: "start",
                                    loop: false,
                                    slidesToScroll: 1,
                                }}
                            >
                                <CarouselContent className="-ml-2">
                                    {testimonials.map((testimonial, index) => (
                                        <CarouselItem key={index} className="pl-2 md:basis-1/2">
                                            <div className="p-1">
                                                <Card className='rounded-none p-0'>
                                                    <CardContent className="flex flex-col gap-6 justify-between aspect-square p-4 rounded-none">
                                                        <div className='flex-1 overflow-y-auto'>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <p className='text-sm text-neutral-800 line-clamp-[9]'>
                                                                        {testimonial.message}
                                                                    </p>
                                                                </TooltipTrigger>
                                                                <TooltipContent className='max-w-[500px] p-5'>
                                                                    <p className='text-sm text-neutral-800'>
                                                                        {testimonial.message}
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>

                                                        <div className='flex items-center justify-between gap-4'>
                                                            <p className='text-xs text-neutral-800 line-clamp-1'>{testimonial.date}</p>
                                                            <p className='text-xs text-black line-clamp-1 font-semibold uppercase'>{testimonial.name}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <div className='mt-18 flex items-center justify-end gap-3'>
                                    <CarouselPrevious className='static rounded-none text-black' />
                                    <CarouselNext className='static rounded-none text-black' />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-[1350px] mx-auto px-6 md:px-12 lg:px-14 py-20'>
                <h3 className='text-center text-2xl lg:text-2xl font-normal mb-6'>
                    WE ARE PROUD OF OUR
                    <br />
                    <span className="text-primary">ACHIEVEMENTS</span>
                </h3>

                <p className='text-center text-sm mb-5 max-w-4xl mx-auto'>
                    Exclusive Algarve Villas has won various awards over the years, from “Best Real Estate Agency Website” to “Best Real Estate Agency Portugal” by the International Property Awards in London. Furthermore has also won an award in 2019 by Best Luxury Real Estate Agency 2019 by Build Magazine.
                </p>

                <div className="flex items-center justify-center gap-x-3 gap-y-3 flex-wrap mt-16">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-[15%] min-w-[180px] lg:min-w-[140px]">
                            <div className={cn('bg-transparent h-[400px] flex', (index % 2) === 0 && 'items-start', (index % 2) === 1 && 'items-end')}>
                                <div className="bg-white h-[95%] items-center justify-center p-6 w-full relative">
                                    <Image src='/images/lifestyle-img1.png' fill alt='about-us' className='object-cover' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ContactSection theme='dark' />

            <DiscoverSection />
        </>
    )
}

export default AboutUs