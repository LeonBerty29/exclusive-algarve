import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import DiscoverSection from "@/components/home/discover-section";
import { ContactSection } from "@/components/shared/contact-section";
import ClientTestimonial from "@/components/about-us/client-testimonial";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("about");

  const images = [
    "/images/awards/awards-badge.jpg",
    "/images/awards/awards-1.jpg",
    "/images/awards/awards-2.jpg",
    "/images/awards/awards-badge.jpg",
    "/images/awards/awards-1.jpg",
    "/images/awards/awards-2.jpg",
  ];
  return (
    <>
      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-12">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full md:w-[50%] md:pr-8 lg:pr-14">
            <h1 className="text-2xl lg:text-3xl font-normal sm:max-w-70 mb-6">
              {t("title")}
            </h1>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              {t("textAboutEav")}
            </p>
          </div>

          <Image
            priority
            src="/images/about/about-img-1.png"
            width={646}
            height={403}
            alt="about-us"
            className="object-cover w-full h-72 md:w-[50%]  xl:h-[390px] md:h-auto"
          />
        </div>

        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <Image
            priority
            src="/images/about/about-img-2.png"
            width={646}
            height={403}
            alt="about-us"
            className="object-cover w-full h-72 md:w-[50%] xl:h-[390px] md:h-auto order-2 md:order-1"
          />

          <div className="w-full md:w-[50%] lg:min-w-[unset] md:pl-8 lg:pl-14 order-1 md:order-2">
            <h2 className="text-2xl lg:text-3xl font-normal sm:max-w-70 mb-6">
              {t("meetTiltlePart1")} <br /> {t("meetTiltlePart2")}
            </h2>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              {t("meetTheTeamText")}
            </p>

            <Button
              asChild
              className="bg-primary hover:bg-black text-white transition-colors mt-5"
            >
              <Link href="/about-eav/the-team">{t("seeTheTeam")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <ClientTestimonial />

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-20">
        <h3 className="text-center text-2xl lg:text-2xl font-normal mb-6">
          {t("proudAchievement1")}
          <br />
          <span className="text-primary">{t("proudAchievement2")}</span>
        </h3>

        <p className="text-center text-sm mb-5 max-w-4xl mx-auto">
          {t("meetTheTeamText")}
        </p>

        <div className="flex items-center justify-center gap-x-3 gap-y-3 flex-wrap mt-16">
          {images.map((image, index) => (
            <div key={index} className="w-[15%] min-w-[180px] lg:min-w-[140px]">
              <div
                className={cn(
                  "bg-transparent h-[400px] flex",
                  index % 2 === 0 && "items-start",
                  index % 2 === 1 && "items-end"
                )}
              >
                <div className="bg-white h-[95%] items-center justify-center p-6 w-full relative">
                  <Image
                    src={image}
                    fill
                    alt="about-us"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactSection theme="dark" />

      <DiscoverSection />
    </>
  );
};

export default AboutUs;
