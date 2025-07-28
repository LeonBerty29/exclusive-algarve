import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import DiscoverSection from "@/components/home/discover-section";
import { ContactSection } from "@/components/shared/contact-section";
import ClientTestimonial from "@/components/about-us/client-testimonial";

const AboutUs = () => {

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
              ABOUT EXCLUSIVE ALGARVE VILLAS
            </h1>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              Exclusive Algarve Villas has been a known name in the sale of
              luxurious and unique Properties in the Western and Central Algarve
              since 2006. With many years of experience, we lead a team of
              property professionals who are knowledgeable in their work area
              and will be dedicated to show you all the ins and outs of the
              Algarve region.
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
              MEET <br /> THE TEAM
            </h2>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              Directors Marcela Boturao & Bart van Linden would like to welcome
              you to meet the team of Exclusive Algarve Villas. Both Marcela and
              Bart have been active in selling luxury real estate in the Algarve
              for over a decade. They have built up a multi award winning
              company and continue to grow the business year after year.
            </p>
          </div>
        </div>
      </div>

      <ClientTestimonial />

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-20">
        <h3 className="text-center text-2xl lg:text-2xl font-normal mb-6">
          WE ARE PROUD OF OUR
          <br />
          <span className="text-primary">ACHIEVEMENTS</span>
        </h3>

        <p className="text-center text-sm mb-5 max-w-4xl mx-auto">
          Exclusive Algarve Villas has won various awards over the years, from
          “Best Real Estate Agency Website” to “Best Real Estate Agency
          Portugal” by the International Property Awards in London. Furthermore
          has also won an award in 2019 by Best Luxury Real Estate Agency 2019
          by Build Magazine.
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
