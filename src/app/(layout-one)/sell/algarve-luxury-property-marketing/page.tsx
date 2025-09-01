// import Image from "next/image";
import DiscoverSection from "@/components/home/discover-section";
import { ContactForm } from "@/components/shared/contact-form";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCent,
  Command,
  HousePlus,
  Mail,
  Milestone,
  NotebookText,
  RectangleEllipsisIcon,
  ScanSearch,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { TbMessageCircleStar } from "react-icons/tb";

const page = () => {
  return (
    <>
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-24 pb-12">
        <h1 className="text-lg md:text-xl lg:text-3xl font-bold mb-6 lg:mb-10 max-w-4xl">
          Exclusive Algarve Villas - digital online property marketing to sell
          luxury real estate in Portugal
        </h1>

        <div className="flex flex-col md:flex-row gap-x-10 gap-y-6 mb-6">
          <div className="flex-1 space-y-6">
            <Separator className="mb-6" />
            <p className="text-gray-600">
              The innovation and implementation of new techniques for promoting
              luxury properties in the Algarve is an imperative and essential
              task for any real estate agency that wants to prosper in this
              increasingly competitive sector.
            </p>
            <div className="w-full aspect-square relative rounded-xl">
              <Image
                src="/images/innovation.png"
                fill
                alt="online-marketing"
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-6">
            <div className="w-full aspect-square relative rounded-xl order-2 md:order-1">
              <Image
                src="/images/lifestyle/lifestyle-img-3.jpg"
                fill
                alt="online-marketing"
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="text-gray-600 order-1 md:order-2">
              That is why at Exclusive Algarve Villas, we are always looking for
              new methods that enhance the exposure of our properties and allow
              us to easily reach our target audience, always keeping in mind the
              delivery of relevant content, not only through traditional means,
              but mostly through digital tools, since a large proportion of
              buyers begin their search online, according to data from the
              previous year.
            </p>

            <Separator className="mb-6 order-3" />
          </div>
        </div>

        <p className="text-gray-600">
          For those who&apos;d like to know more, below is a quick breakdown of
          our internal marketing strategies:
        </p>
      </div>

      <div className="bg-neutral-900">
        <div className="text-white 2xl:container mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-14">
          <h3 className="text-2xl lg:text-3xl font-bold mb-8">
            Digital Marketing:
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <Command className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">Website</h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Works as the main source for property promotion, lead
                  generation and brand positioning: we update our website
                  regularly to ensure fast loading responses and mobile friendly
                  compatibility;
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <NotebookText className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  Blog and landing pages
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  They allow us to educate, inform and capture leads: we publish
                  weekly blog posts with relevant SEO-focused content and local
                  news; and we have developed dedicated landing pages for
                  buying/selling in the Algarve as well as for investment
                  guides;
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <ScanSearch className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  SEO (Search Engine Optimization)
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Improves organic search visibility and drives traffic to the
                  website: we are constantly working on keyword optimization, as
                  well as technical and local SEO to reach a larger audience and
                  ensure we appear at the top results of the search engines,
                  guaranteeing maximum exposure and the best presentation for
                  our properties;
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <HousePlus className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  Real estate portals and SEM (Search Engine Marketing)
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Drives traffic and lead generation through paid campaigns and
                  adwords: we promote our properties in all the main national
                  and international real estate portals; and we launch ads for
                  the search and display network on Google Ads, with specific
                  landing pages;
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <TbMessageCircleStar className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  Social Media
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Helps us attract and nurture potential buyers through visual
                  storytelling: we post new listings, market updates, expert
                  tips, and more every week on our social media platforms
                  (Instagram, Facebook and Linkedin); we are also present on
                  Youtube, where we share high-quality professional video tours
                  of our properties.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <Mail className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  Email marketing and content strategy
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Helps establish authority and attract organic traffic through
                  valuable content: in addition to the monthly newsletter with
                  our newest listings and other relevant updates for our
                  subscribers, we have also developed targeted buyer email
                  campaigns.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
              <div className="space-y-2">
                <BadgeCent className="w-5 h-5" />
                <h3 className="text-lg lg:text-xl font-semibold">
                  Affiliate Marketing
                </h3>
                {/* <Image src={} /> */}
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-white/70">
                  Allows us to increase reach and brand-awareness through
                  referral partnerships: we offer referral bonuses to past
                  clients and industry partners who recommend our services and
                  bring us new leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-black 2xl:container mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-14">
          <div className="flex gap-6 items-center">
            <div className="hidden xl:block flex-1">
              <Image
                src={"/images/tomorrow-magazine.jpg"}
                alt="Tomorrow magazine"
                width={802}
                height={671}
                className="w-full h-auto"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold mb-8">
                Traditional marketing:
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
                  <div className="space-y-2">
                    <Milestone className="w-5 h-5 opacity-70" />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      For sale signs
                    </h3>
                    {/* <Image src={} /> */}
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-black/70 text-sm">
                      our &quot;For sale signs&quot; are undoubtedly one of the
                      best sources of lead generation, as the clients who
                      contact us through these are already familiar with the
                      property&apos;s location and are interested in it.
                    </p>
                  </div>
                </div>

                <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
                  <div className="space-y-2">
                    <NotebookText className="w-5 h-5 opacity-70" />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      Newspapers
                    </h3>
                    {/* <Image src={} /> */}
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-black/70 text-sm">
                      we collaborate with local newspapers that publish our
                      advertisements in their monthly editions, for both
                      national and international audiences (SAPO; Portugal News;
                      Tomorrow magazine; Portugal Resident, etc.).
                    </p>
                  </div>
                </div>

                <div className="border border-gray-300 shadow-lg p-6 rounded-2xl flex flex-col gap-x-6 gap-y-3">
                  <div className="space-y-2">
                    <RectangleEllipsisIcon className="w-5 h-5 opacity-70" />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      Outdoors billboards
                    </h3>
                    {/* <Image src={} /> */}
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-black/70 text-sm">
                      we currently have 4 advertising billboards in
                      strategically positioned locations throughout the Algarve,
                      that increase brand-awareness.
                    </p>
                  </div>
                </div>
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

      <DiscoverSection />
    </>
  );
};

export default page;
