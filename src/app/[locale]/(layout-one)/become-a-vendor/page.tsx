import Image from "next/image";
import React from "react";
import DiscoverSection from "@/components/home/discover-section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import AnimatedImagesSection from "@/components/shared/animated-image-section";
import { ContactForm } from "@/components/shared/contact-form";

const BecomeAVendor = () => {
  return (
    <>
      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-12">
        <div className="flex items-start gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[50%] md:pr-8 lg:pr-14">
            <p className="text-primary font-light text-sm mb-2">
              BECOME A VENDOR
            </p>
            <h1 className="text-2xl lg:text-3xl font-semibold sm:max-w-70 mb-6">
              SELL MY PROPERTY IN THE ALGARVE
            </h1>

            <p className="text-black font-medium mb-4 text-sm xl:text-base">
              You decided to sell your property in the Algarve, and now what?
            </p>
            <div className="space-y-4">
              <p className="text-black/75 text-sm xl:text-base">
                Vendors often feel overwhelmed with bureaucracy, unsure of where
                to start from, when they decide on selling a property in the
                Algarve. At Exclusive Algarve Villas we are here to assist you
                all the way with the sale of your property and ensure that you
                optimize all aspects of selling your real estate asset towards a
                successful sale.
              </p>
              <p className="text-black/75 text-sm xl:text-base">
                Observe your property prior to put it on the market for sale,
                and now answer, how appealing is your property to buyers? What
                can you do to improve your villa or apartment for sale in the
                Algarve?
              </p>
              <p className="text-black/75 text-sm xl:text-base">
                You guess it right, there&apos;s homework to do!
              </p>
            </div>
          </div>

          {/* 4-Box Layout */}
          <div className="w-full lg:w-[50%] relative flex justify-center lg:justify-end">
            <ol className="ml-auto grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 list-none">
              {/* Box 1 */}
              <li className="bg-gray-100 p-6 shadow-md">
                <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-lg font-medium mb-4">
                  1
                </div>
                <h3 className="text-primary font-semibold mb-3 text-sm">
                  Stage Your Property
                </h3>
                <p className="text-black/75 text-xs leading-relaxed">
                  Observe your property prior to put it on the market for sale,
                  and now answer, how appealing is your property to buyers?
                </p>
              </li>

              {/* Box 2 - Offset down */}
              <li className="bg-black text-white p-6 shadow-md sm:translate-y-12">
                <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-lg font-medium mb-4">
                  2
                </div>
                <h3 className="text-white font-semibold mb-3 text-sm">
                  Property <br /> Documentation
                </h3>
                <p className="text-white/75 text-xs leading-relaxed">
                  It&apos;s important that all your property documents are in order
                  before listing your property in real estate agency.
                </p>
              </li>

              {/* Box 3 */}
              <li className="bg-primary text-white p-6 shadow-md">
                <div className="w-8 h-8 bg-white text-primary flex items-center justify-center text-lg font-medium mb-4">
                  3
                </div>
                <h3 className="text-white font-semibold mb-3 text-sm">
                  Ready To Sell
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  Now that your property is looking at its best and you signed
                  the mediation contract, you are ready to sell!
                </p>
              </li>

              {/* Box 4 - Offset down */}
              <li className="bg-gray-100 p-6 shadow-md sm:translate-y-12">
                <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-lg font-medium mb-4">
                  4
                </div>
                <h3 className="text-primary font-semibold mb-3 text-sm">
                  Marketing
                </h3>
                <p className="text-black/75 text-xs leading-relaxed">
                  Your property will be displayed on our wide network of
                  international property portals and websites.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 text-primary py-18">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-4 px-4">
          IS MY PROPERTY’S
          <br /> MAINTENANCE ALL DONE?
        </h2>
        <div className="lg:container mx-auto px-6 md:px-12 lg:px-14">
          <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
            <AnimatedImagesSection />

            <div className="w-full lg:w-[50%] lg:min-w-[unset] lg:pl-14 order-1 lg:order-2">
              <div className="space-y-4">
                <p className="text-white/75 text-sm xl:text-base">
                  Staging your property for sale is essential to attract buyers
                  in today´s real estate market. Make sure that you keep your
                  villa or apartment clean of clutter and personal items, use
                  neutral colors throughout, open windows and turn on lights
                  during viewings.
                </p>
                <p className="text-white/75 text-sm xl:text-base">
                  It is equally essential to present your property for sale to
                  buyers well maintained. When you’ve been living in the
                  property for many years, small maintenance jobs can be
                  overlooked. Is your home in need of tender love and care?
                </p>
                <p className="text-white/75 text-sm xl:text-base">
                  Take care of any repairs needed before putting the property on
                  the market for sale, to achieve the best selling price on your
                  villa or apartment for sale. If you think that your property
                  needs a new kitchen or bathroom, leave it to the next owner,
                  as the buyers often welcome the idea of small refurbishments.
                </p>

                <Button className="text-white bg-primary hover:bg-black transition-colors mt-4">
                  BECOME A VENDOR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14">
        <div className="flex items-center gap-y-5 justify-between flex-wrap pt-12 lg:pt-0">
          <div className="w-full lg:w-[50%] md:pr-8 lg:pr-14">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
              IS MY PROPERTY <br /> DOCUMENTATION IN ORDER
            </h2>
            <p className="text-neutral-700 text-sm xl:text-base mb-5 md:mb-0">
              It&apos;s important that all your property documents are in order
              before listing your property with our real estate agency. We can
              meet with you and go through this together.
            </p>
          </div>

          <Image
            priority
            src="/images/become-a-vendor/documentation-order.png"
            width={746}
            height={460}
            alt="about-us"
            className="object-cover w-full h-72 lg:w-[50%]  lg:h-[480px] md:h-auto"
          />
        </div>
      </div>

      <RealEstateChecklist />

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-12">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <Image
            priority
            src="/images/become-a-vendor/no-contract-sell.png"
            width={746}
            height={460}
            alt="about-us"
            className="object-cover w-full h-72 lg:w-[50%]  lg:h-[480px] md:h-auto order-2 lg:order-1"
          />

          <div className="w-full lg:w-[50%] lg:min-w-[unset] lg:pl-14 order-1 lg:order-2">
            <h3 className="text-2xl lg:text-3xl font-semibold sm:max-w-70 mb-6">
              NO CONTRACT <br /> NO SALE!!
            </h3>
            <div className="space-y-3">
              <p className="text-neutral-700 text-sm xl:text-base">
                Exclusive Algarve Villas is a licensed real estate agency with
                the license number AMI-7516 by Exclusive Living Mediaçao
                Imobilaria Lda.
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                As a licensed real estate agency, we are required to have a
                signed mediation contract (Agency agreement) in order to
                officially list your property for sale. So,{" "}
                <b>NO CONTRACT = NO SALE!!</b>
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                Mediation contracts are normally valid for a 6 months with
                renewable equal periods, and can be on an “exclusive” or a
                “non-exclusive” basis. We use the standard contract approved by
                IMPIC, the organ regulating the real estate and building
                licenses. Any questions on the contract can be clarified by our
                sales team.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[50%] md:pr-8 lg:pr-14">
            <h3 className="text-2xl lg:text-3xl font-semibold sm:max-w-70 mb-6">
              READY TO SELL?
            </h3>

            <div className="space-y-3">
              <p className="text-neutral-700 text-sm xl:text-base">
                Now that your property is looking at its best, all the documents
                of the property are in order and you signed the mediation
                contract, you are ready to sell your property!
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                Our professional team at Exclusive Algarve Villas market your
                property for sale with the assistance of our in-house
                photographer and works with you on the property description,
                ensuring that all property’s features and equipment are well
                documented and presented.
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                For high-end luxury real estate, sea front villas and unique
                exclusive homes for sale in the West and Central Algarve, we
                also use the services of professional photographers and drone
                video services.
              </p>
            </div>
          </div>

          <Image
            priority
            src="/images/become-a-vendor/ready-to-sell.png"
            width={746}
            height={460}
            alt="about-us"
            className="object-cover w-full h-72 lg:w-[50%]  lg:h-[480px] md:h-auto"
          />
        </div>

        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <Image
            priority
            src="/images/become-a-vendor/marketing.png"
            width={746}
            height={460}
            alt="about-us"
            className="object-cover w-full h-72 lg:w-[50%]  lg:h-[480px] md:h-auto order-2 lg:order-1"
          />

          <div className="w-full lg:w-[50%] lg:min-w-[unset] lg:pl-14 order-1 lg:order-2">
            <h3 className="text-2xl lg:text-3xl font-semibold sm:max-w-70 mb-6">
              MARKETING
            </h3>
            <div className="space-y-3">
              <p className="text-neutral-700 text-sm xl:text-base">
                As soon as you confirm all the details, your property will be
                displayed on our wide network of international property portals
                and websites. We also work with trusted national and
                international real estate agencies and investment contacts to
                find the right buyer for your property.
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                If you have any questions in regards to listing your property
                for sale with Exclusive Algarve Villas, please contact us on{" "}
                <Link
                  href="tel:+351282353019"
                  className="text-primary hover:underline"
                >
                  +351 282 353 019
                </Link>{" "}
                or{" "}
                <Link
                  href="mailto:info@eavillas.com"
                  className="text-primary hover:underline"
                >
                  info@eavillas.com
                </Link>{" "}
                and we&apos;ll be happy to assist you.
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                Alternatively, you can use the webform below to submit
                information on the property you have for sale and one member of
                our sales team will be in touch with you shortly.
              </p>
              <p className="text-neutral-700 text-sm xl:text-base">
                Thank you for your trust, we look forward to working with you
                soon!
              </p>

              <Button className="text-white bg-primary hover:bg-black transition-colors mt-4">
                DISCOVER OUR STRATEGY
              </Button>
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

      <DiscoverSection />
    </>
  );
};

export default BecomeAVendor;

function RealEstateChecklist() {
  const checklistItems = [
    "Passport or other ID of the seller(s)",
    "Copy of the Fiscal ID Number (NIF)",
    "If a company is selling the property, the share certificates and holders of these need to be identified",
    "Caderneta predial (finanças)",
    "Certidao de teor (conservatoria do registro)",
    "Licenca de habitacao (camara)",
    "Ficha tecnica (camara)",
    "Energy certificate",
    "Floor plans (Final approved version with the stamp from the camara)",
    "Borehole registration (if applicable)",
    "Septic tank registration (if applicable)",
  ];

  return (
    <div className="mt-5">
      <div className="relative flex items-start gap-y-5 justify-between flex-wrap">
        <div className="w-full">
          <div className="bg-gray-200">
            <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-10 md:py-24">
              <h3 className="text-2xl lg:text-3xl font-semibold uppercase w-full md:w-1/2 pr-5 lg:max-w-[450px]">
                Here&apos;s a quick checklist of documents required for real
                estate owned in Portugal:
              </h3>
            </div>
          </div>
          <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-10 md:py-24">
            <p className="w-full md:w-1/2 max-w-[650px]  pr-5 text-neutral-700 text-sm xl:text-base md:mb-0">
              This checklist outlines the essential documents required to
              legally sell real estate in Portugal. Its main goal is to ensure
              the property is fully compliant with local regulations and that
              the seller&apos;s identity and ownership are properly verified.
              The documents include personal or corporate identification, proof
              of property registration and technical specifications, as well as
              legal permits like the habitation license and energy
              certificate—ensuring a smooth and transparent transaction for both
              seller and buyer.
            </p>
          </div>
        </div>

        <div className="max-w-[650px] space-y-3 bg-white shadow-lg rounded-lg p-10 border border-gray-100 md:absolute md:left-1/2 md:top-24">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="size-5 border border-gray-500"></div>
              <span className="flex-1 text-neutral-700 text-sm xl:text-base leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
