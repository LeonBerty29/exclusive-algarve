import DiscoverSection from "@/components/home/discover-section";
import { ContactForm } from "@/components/shared/contact-form";
import { Separator } from "@/components/ui/separator";
import { Lightbulb } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-24 pb-12">
        <h1 className="text-lg md:text-xl lg:text-3xl font-bold mb-6 lg:mb-10 max-w-4xl">
          Selling Luxury Properties in the Algarve
        </h1>

        <Separator className="mb-6" />
        <div className="flex flex-col lg:flex-row gap-x-10 gap-y-6 mb-6 py-8">
          <div className="lg:w-[40%]">
            <h2 className="font-semibold text-xl text-primary max-w-sm">
              Exclusive Algarve Villas is keen to work together with you to sell
              your property!
            </h2>
          </div>
          <div className="flex-1 flex flex-col space-y-6">
            <p className="text-gray-600 order-1 md:order-2">
              Our company, right from day one of its existence, has invested
              heavily in digital marketing. Our main yearly cost is applied in
              digital technology. From our own in-house CRM software to renewing
              our website every 1,5 years to keep up with the latest
              technologies, we are constantly applying the changes and
              improvements necessary to ensure that we are the first in our
              field to be equipped with the most recent digital tools.
            </p>
          </div>
        </div>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-10">
          <div className="p-8 bg-gray-100 rounded-xl">
            <Lightbulb className="w-8 h-8 mb-3" />
            <h3 className="font-medium text-2xl lg:text-4xl max-w-sm">
              Just to give you an idea
            </h3>
          </div>

          <div className="p-8 bg-gray-100 rounded-xl space-y-6">
            <p className="text-lg font-semibold text-primary">01</p>
            <p className="text-gray-700">
              10 years ago, if we would have asked clients if they would search
              a property on their mobile phone, they would have thought we were
              mad. Nowadays, a large part of traffic comes from mobile phones,
              tablets and ipads.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-xl space-y-6">
            <p className="text-lg font-semibold text-primary">02</p>
            <p className="text-gray-700">
              The usage of a website has changed a lot, and some items that were
              important 10 years ago, have become unimportant today, and
              vice-versa. It’s therefore vital, as a company that has been
              successful in selling luxury real estate in the Algarve, to stay
              on top of the latest trends and to adjust accordingly.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-xl space-y-6">
            <p className="text-lg font-semibold text-primary">03</p>
            <p className="text-gray-700">
              What we offer is a ‘service’ - We find buyers mostly in European
              markets, but also expats abroad who come to come back to Europe,
              to enjoy a warm climate in south Portugal. With the NHR (Non
              Habitual Residency), and Golden Visa regime, new buyers from all
              over the world have now also been coming to the Algarve.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-xl space-y-6">
            <p className="text-lg font-semibold text-primary">04</p>
            <p className="text-gray-700">
              Our website www.ExclusiveAlgarveVillas.com is just one of the
              digital tools we use for marketing. We also use other property
              websites, property portals, search engine advertising as well as
              search engine optimization to generate enquiries.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-xl space-y-6">
            <p className="text-lg font-semibold text-primary">05</p>
            <p className="text-gray-700">
              Exclusive Algarve Villas has always opted to work with a small
              team of highly motivated and professional sales people to ensure
              we can give our clients a good quality and personalized service
              for Algarve property buyers and sellers.
            </p>
          </div>
        </div>

        <p className="text-gray-700 max-w-2xl text-center mx-auto">
          If you are looking to sell your beautiful property in the Algarve,
          give us a call or send us an email. Our local sales team will contact
          you for a free evaluation and to best advise you what is required to
          sell your villa in today’s market.
        </p>
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

export default page;
