import { ContactForm } from "@/components/shared/contact-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const YearlyPropertyTaxes = async() => {
  const t = await getTranslations("yearlyPropertyTaxesPage");

  return (
    <div>
      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full md:w-[47%] 2xl:w-[44%] space-y-6">
            <h1 className="text-2xl font-semibold">
              {t("yearlyPropertyTaxes")}
            </h1>
            <p>{t("whenOwningRealEstateInPortugal")}</p>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              {t("yearlyPropertyTaxesDescriptionPart1")}
              <br />
              {t("yearlyPropertyTaxesDescriptionPart2")}
            </p>
          </div>

          <Image
            priority
            src="/images/property-taxes-banner.png"
            width={646}
            height={484}
            alt="about-us"
            className="object-contain w-full h-72 md:w-[50%] lg:w-[47%] 2xl:w-[44%] xl:h-[390px] md:h-auto"
          />
        </div>
      </div>
      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="mb-10">
          <h2 className="text-primary text-2xl mb-7 font-semibold">
            {t("imi")}
          </h2>

          <div className="space-y-5">
            <p>{t("imiDescription1")}</p>
            <p>{t("imiDescription2")}</p>
            <p>{t("imiDescription3")}</p>
            <p>
              {t("imiDescription4Part1")}
              <br />
              {t("imiDescription4Part2")}
            </p>
            <p>{t("imiDescription5")}</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-primary text-2xl mb-7 font-semibold">
            {t("aimi")}
          </h2>

          <div className="space-y-5">
            <p>
              {t("aimiDescriptionPart1")}
              <br />
              {t("aimiDescriptionPart2")}
            </p>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                {t("aimiTaxTableTitle")}
              </h3>
              <p>{t("aimiTaxTableDescription")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="max-w-[800px] mx-auto">
          <ContactForm
            theme="light"
            titleStyling="text-center"
            submitBtnStyling="flex mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default YearlyPropertyTaxes;
