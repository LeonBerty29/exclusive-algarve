"use client";
import React from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/shared/contact-form";
import DiscoverSection from "@/components/home/discover-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GoldenVisaProgram = () => {
  const t = useTranslations("goldenVisaProgramPage");

  return (
    <>
      <div className="min-h-[500px] h-[50vh] relative mt-20">
        <div className="absolute top-0 left-0 h-full w-full before:absolute before:inset-0 before:bg-black/60 before:bg-opacity-50 before:content-[''] before:z-10">
          <Image
            src="/images/house-view.png"
            alt={t("algarveHomeAlt")}
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
                <h1 className="text-2xl lg:text-3xl leading-none font-medium">
                  <span className="text-primary">{t("golden")}</span>{" "}
                  {t("visaProgram")}
                  <br />
                  {t("portugal")}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-14">
          <h2 className="text-2xl font-semibold mb-7">{t("whatIsRequired")}</h2>

          <p className="text-sm font-semibold mb-7">
            {t("noteGoldenVisaCeized")}
          </p>
          <p className="text-sm mb-7">{t("rulesResidencePermitDescription")}</p>

          <ul className="text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base">
            <li>{t("residenceVisaWaiver")}</li>
            <li>{t("livingWorkingPortugal")}</li>
            <li>{t("schengenVisaExemption")}</li>
            <li>{t("familyReunification")}</li>
            <li>{t("applyingPermanentResidence")}</li>
            <li>{t("applyingPortugueseCitizenship")}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-7">
            {t("eligibilityWhoMayApply")}
          </h2>

          <p className="text-sm mb-7">{t("eligibilityDescription")}</p>

          <ul className="text-neutral-500 list-disc ml-4 mb-7 text-sm sm:text-base space-y-5">
            <li>{t("capitalTransfer1_5Million")}</li>
            <li>{t("create10JobPositions")}</li>
            <li>{t("capitalTransfer500kResearch")}</li>
            <li>{t("capitalTransfer250kArtsHeritage")}</li>
            <li>{t("capitalTransfer500kInvestmentFunds")}</li>
            <li>{t("capitalTransfer500kCommercialSociety")}</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
          <h3 className="text-center mb-5 max-w-md mx-auto font-semibold text-2xl">
            {t("mandatoryOnlinePreRegistration")}
          </h3>

          <Button className="bg-primary text-white px-12 font-light mx-auto flex">
            {t("applyHere")}
          </Button>
        </div>
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="max-w-[800px] mx-auto xl:py-8">
          <ContactForm
            theme="light"
            titleStyling="text-center"
            submitBtnStyling="flex mx-auto"
          />
        </div>
      </div>

      <DiscoverSection />
    </>
  );
};

export default GoldenVisaProgram;
