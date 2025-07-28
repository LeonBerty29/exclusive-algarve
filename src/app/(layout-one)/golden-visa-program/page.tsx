"use client"
import React from 'react'
import { motion } from "framer-motion";
import { ContactForm } from '@/components/shared/contact-form';
import DiscoverSection from '@/components/home/discover-section';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const GoldenVisaProgram = () => {
    return (
        <>
            <div className="min-h-[500px] h-[50vh] relative mt-20">
                <div className="absolute top-0 left-0 h-full w-full before:absolute before:inset-0 before:bg-black/60 before:bg-opacity-50 before:content-[''] before:z-10">
                    <Image
                        src="/images/house-view.png"
                        alt="Algarve home"
                        width={1513}
                        height={622}
                        className=" h-full w-full object-cover"
                        priority
                    />

                    <div className="absolute left-0 right-0 bottom-0 top-0 z-20 flex justify-center">
                        <motion.div
                            className="container px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20  text-white z-22 flex items-end w-full gap-9"
                            initial={{
                                y: 100,
                                opacity: 0,
                            }}
                            whileInView={{
                                y: 0,
                                opacity: 1,
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <div>
                                <h1 className='text-2xl lg:text-3xl leading-none font-medium'>
                                    <span className='text-primary'>GOLDEN</span> VISA PROGRAM<br />
                                    PORTUGAL
                                </h1>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>

            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='mb-6 sm:mb-8 md:mb-10 lg:mb-14'>
                    <h2 className='text-2xl font-semibold mb-7'>What is required</h2>

                    <p className='text-sm font-semibold mb-7'>Please note that the Golden Visa program as formerly known has ceized to exist, it is however possible to still obtain a golden visa, however this is not anymore linked to purchasing real estate. (information updated on october 2023). Please check the latest information with your local lawyer.</p>
                    <p className='text-sm mb-7'>The rules governing the granting of Residence Permit for Investment (ARI / Golden Visa), in force from 8 October 2012, enable third country nationals to obtain a temporary residence permit to conduct business activities with visa waiver to enter national territory. The beneficiaries of ARI / Golden Visa are entitled to  :</p>


                    <ul className='text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base'>
                        <li>Residence visa waiver for entering Portugal;</li>
                        <li>Living and working in Portugal, on condition that they stay in Portugal for a period of 7 or more days, in the first year, and 14 or more days, in the subsequent years;</li>
                        <li>Visa exemption for travelling within the Schengen Area;</li>
                        <li>Family reunification;</li>
                        <li>Applying for permanent residence (pursuant to the Aliens Act – Act number 23/2007 of 4 July with the current wording). To the citizens holding a residence permit for investment purposes and their family members, complying with the requirements provided in article 80 of the Aliens Act and wish to be granted with a permanent residence permit, a permanent residence permit for investment purposes shall be issued, exempt of the provided in article 85, n.ºs 2, 3 and 4, subparagraph b) of the same diploma (cancellation of the right due to absences from the national territory, see article 65-k of the Regulatory Decree 84/07 of 5/11, as amended). The Permanent Residence Permit for investment purposes may be subject to specific fees of analysis and issuance, to be regulated by amendments to Ordinance 1334-E/2010, of December 31;</li>
                        <li>Applying for Portuguese citizenship, by naturalization, provided all other requirements set out by the Nationality Act are fulfilled (Act number 37/81 of 3 October, with the current wording);</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-2xl font-semibold mb-7'>Eligibility – Who may apply?</h2>

                    <p className='text-sm mb-7'>All third country citizens who conduct an investment activity, as an individual businessperson or through a company set up in Portugal or in another EU Member State and who, in addition, are stably settled in Portugal, provided these citizens fulfil the quantitative requirements and the time requirements set out by the relevant legislation, may apply for a Residence Permit for Investment, by one of the following routes:</p>


                    <ul className='text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base space-y-5'>
                        <li>apital transfer with a value equal to or above 1.5 million Euros;</li>
                        <li>The creation of, at least, 10 job positions;</li>
                        <li>Capital transfer with a value equal to or above 500 thousand Euros for investing  in research activities conducted by public or private scientific research institutions involved in the national scientific or technologic system;</li>
                        <li>Capital transfer with a value equal to or above 250 thousand Euros for investing  in artistic output or supporting the arts, for reconstruction or refurbishment of the national heritage, through the local and central authorities, public institutions, public corporate sector, public foundations, private foundations of public interest,  networked local authorities, local corporate sector organizations, local associations and public cultural associations, pursuing activities of artistic output, and reconstruction or maintenance of the national heritage;</li>
                        <li>Capital transfer of the amount of 500 thousand Euros, or higher, for the acquisition of units of investment funds or venture capital fund of funds dedicated to the capitalisation of companies, capital injected under the Portuguese legislation, whose maturity, at the moment of the investment, is, at least, of five years and, at least, 60% of the investments is realized in commercial companies with head office in national territory; </li>
                        <li>Capital transfer of the amount of 500 thousand  Euros, or higher, for constitution of a commercial society with head office in the national territory, combined with the creation of five permanent working jobs, or for the reinforcement of the share capital of a commercial society with head office in national territory, already existing, with the creation or keeping of working jobs, with a minimum of five permanent jobs, and for a minimum period of three years.</li>
                    </ul>
                </div>

            </div>

            <div className='bg-gray-100'>
                <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                    <h3 className='text-center mb-5 max-w-md mx-auto font-semibold text-2xl'>Mandatory Online pre-registration is available</h3>

                    <Button className='bg-primary text-white px-12 font-light mx-auto flex'>
                        APPLY HERE
                    </Button>
                </div>
            </div>



            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
                <div className='max-w-[800px] mx-auto xl:py-8'>
                    <ContactForm theme='light' titleStyling='text-center' submitBtnStyling='flex mx-auto' />
                </div>
            </div>

            <DiscoverSection />
        </>
    )
}

export default GoldenVisaProgram