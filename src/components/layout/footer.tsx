import { Link } from "@/i18n/navigation";
import React from "react";
import { NewsletterForm } from "./newsletter-form";
import { MessageForm } from "./message-us-form";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons/lib";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navigations: { name: string; link: any }[] = [
  {
    name: "Buy",
    link: "/buying-process",
  },
  {
    name: "Sell",
    link: "/become-a-vendor",
  },
  {
    name: "About Us",
    link: "/about-eav",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Properties",
    link: "/properties",
  },
  {
    name: "Blog",
    link: "/blogs",
  },
  // {
  //   name: "Terms and Conditions",
  //   link: "/terms-and-conditions",
  // },
  // {
  //   name: "Privacy Policy",
  //   link: "/privacy-policy",
  // },
  // {
  //   name: "Cookie Policy",
  //   link: "/cookie-policy",
  // },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources: { name: string; link: any }[] = [
  {
    name: "The selling process",
    link: "/become-a-vendor",
  },
  {
    name: "Portugal properties taxes",
    link: "/yearly-property-taxes",
  },
  {
    name: "The buying process",
    link: "/buying-process",
  },
  {
    name: "Digital Nomad Visa",
    link: "/digital-nomad-visa",
  },
  {
    name: "Golden Visa Program",
    link: "/golden-visa-program",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const socialMediaplatforms: { name: string; link: any; icon: IconType }[] = [
  {
    name: "Facebook",
    link: "#",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    link: "#",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    link: "#",
    icon: FaTwitter,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const locations: { name: string; address: string; link: any; }[] = [
  {
    name: "Vilamoura",
    address: "Av.Tivoli, B, Bloco 3, R/C Esq8125-410 Vilamoura",
    link: "https://www.google.com/maps/place/Exclusive+Algarve+Villas+-+VILAMOURA+-+Luxury+real+estate+agency/@37.0807699,-8.1157467,570m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd1ab5bd0de9a74d:0x365a6c5338873b2!8m2!3d37.0807699!4d-8.1157467!16s%2Fg%2F11wqrdr6q6?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Lagoa",
    address: "R. Ernesto Cabrita, Edif. Vales, Loja A8400-387 Lagoa",
    link: "https://www.google.com/maps/place/Exclusive+Algarve+Villas+-+Lagoa+(Carvoeiro)+-+Luxury+real+estate+agency/@37.1351626,-8.4588553,570m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd1ad7b9f6406fad:0x1faa9a9dd838f5ba!8m2!3d37.1351626!4d-8.4588553!16s%2Fg%2F11yhj8sl2?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Lagos",
    address: "R. Ernesto Cabrita, Edif. Vales, Loja A8400-387 Lagoa",
    link: "https://www.google.com/maps/place/Exclusive+Algarve+Villas+-+LAGOS+-+Luxury+real+estate+agency/@37.1110648,-8.6814324,570m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd1b31418b50f1e7:0xcff931dc671940b!8m2!3d37.1110648!4d-8.6814324!16s%2Fg%2F11wn7pk_fy?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D",
  },
];

const Footer = () => {
  return (
    <div className="bg-neutral-900">
      <div className="text-white 2xl:container mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-14 xl:py-20 !pb-0">
        <div className="flex items-start gap-28 flex-wrap gap-y-12">
          <div className="flex-1 min-w-0 sm:min-w-[380px] md:min-w-[500px] lg:min-w-[600px]">
            <h3 className="mb-10 font-light text-xl md:text-2xl lg:text-3xl">
              OUR OFFICES
            </h3>

            <div className="flex items-start flex-wrap gap-4 justify-between gap-y-10">
              <div className="max-w-[285px] min-w-[220px]">
                <ul className="space-y-6 list-none">
                  {locations.map((location, index) => (
                    <li key={`office--location--key--${index}`}>
                      <Link href={location.link} target="_blank">
                        <h4 className="text-sm text-primary font-light uppercase mb-3 hover:underline">
                          {location.name}
                        </h4>
                        <p className="text-xs font-light w-full md:w-[80%] hover:underline">
                          {location.address}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-[200px] w-fit max-w-[285px]">
                <h4 className="text-sm text-primary font-light uppercase mb-3">
                  Navigation
                </h4>
                <ul className="space-y-4 list-none">
                  {navigations.map((navigation, index) => (
                    <li key={`navigation--key--${index}`}>
                      <Link
                        href={navigation.link}
                        className="text-xs font-light"
                      >
                        {navigation.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-[200px] w-fit max-w-[285px]">
                <h4 className="text-sm text-primary font-light uppercase mb-3">
                  Resources
                </h4>
                <ul className="space-y-4 list-none">
                  {resources.map((resource, index) => (
                    <li key={`resource--key--${index}`}>
                      <Link href={resource.link} className="text-xs font-light">
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-[200px] w-fit max-w-[285px]">
                <h4 className="text-sm text-primary font-light uppercase mb-3">
                  Social Media
                </h4>
                <ul className="space-y-4 list-none">
                  {socialMediaplatforms.map((socialMediaplatform, index) => (
                    <li key={`social--media--key--${index}`}>
                      <Link href={socialMediaplatform.link} className="text-xs font-light flex items-center gap-2">
                        <socialMediaplatform.icon />
                        {socialMediaplatform.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-[430px] w-full">
            <h3 className="mb-5 font-light text-xl md:text-2xl lg:text-3xl uppercase">
              Subscribe to our NewsLETTERS
            </h3>
            <NewsletterForm />

            <div className="mt-10 w-full">
              <h3 className="mb-5 font-light text-xl md:text-2xl uppercase">
                Message Us
              </h3>
              <MessageForm />
            </div>
          </div>
        </div>

        <div className="w-full mt-28">
          <Image
            src="/images/logo-exclusive.svg"
            width={150}
            height={50}
            alt="Logo"
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      <div className="bg-gray-200 p-8">
        <p className="text-center text-xs font-light text-neutral-700">
          © 2025 Exclusive Living Mediaçao Imobiliaria Lda. Ami 7516
        </p>
      </div>
    </div>
  );
};

export default Footer;
