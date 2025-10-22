"use client"
import React from 'react'
import { motion } from "framer-motion";
import { ContactForm } from '@/components/shared/contact-form';
import DiscoverSection from '@/components/home/discover-section';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const DigitalNomadVisaPage = () => {
  const t = useTranslations("digitalNomadVisaPage");

  return (
    <>
      <div className="min-h-[500px] h-[50vh] relative mt-20">
        <div className="absolute top-0 left-0 h-full w-full before:absolute before:inset-0 before:bg-black/60 before:bg-opacity-50 before:content-[''] before:z-10">
          <Image
            src="/images/house-view.png"
            alt={t("algarveHomeAlt")}
            width={1920}
            height={1080}
            className=" h-full w-full object-cover"
          />
          <div className="absolute left-0 right-0 bottom-0 top-0 z-20 flex justify-center">
            <motion.div
              className="container px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20  text-white z-22 flex justify-center items-center w-full gap-9"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div>
                <h1 className='text-center text-[45px] sm:text-[100px] lg:text-[140px] leading-none font-extrabold'>
                  <span className='text-[22px] sm:text-[50px] lg:text-[72px]'>{t("digitalNomad")}</span><br />
                  {t("portugal")}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
        <h2 className='text-2xl font-semibold mb-7'>{t("digitalNomadVisa")}</h2>

        <p className='mb-7 text-sm sm:text-base'>{t("visaDescriptionPart1")}<br /><br />
          {t("visaDescriptionPart2")}<br /><br />
          {t("visaDescriptionPart3")}<br />
          {t("visaDescriptionPart4")}
        </p>

        <h4 className='font-medium mb-2'>{t("applicantsMust")}</h4>
        <ul className='text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base'>
          <li>{t("applicantMustBeNonEu")}</li>
          <li>{t("applicantIncomeRequirement")}</li>
          <li>{t("applicantEmploymentStatus")}</li>
          <li>{t("applicantResidencyPath")}</li>
        </ul>

        <p className='text-sm font-semibold'>{t("lawyerRecommendation")}</p>
      </div>

      <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20'>
        <div className='max-w-[800px] mx-auto'>
          <ContactForm theme='light' titleStyling='text-center' submitBtnStyling='flex mx-auto' />
        </div>
      </div>

      <DiscoverSection />
    </>
  )
}

export default DigitalNomadVisaPage;
