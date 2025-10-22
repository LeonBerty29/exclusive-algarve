import DiscoverSection from "@/components/home/discover-section";
import BookMeeting from "@/components/shared/book-meeting";
import { ContactSection } from "@/components/shared/contact-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { getTranslations } from "next-intl/server";

const ContactPage = async() => {
  const t = await getTranslations("contactPage");

  return (
    <>
      <div className="pt-24">
        <ContactSection
          title={t("contactUs")}
          imageSrc=""
          theme="light"
          formTitle={false}
        />
      </div>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full md:w-[47%] 2xl:w-[44%]">
            <h1 className="text-2xl font-semibold mb-6">
              {t("bookAMeetingWithUs")}
            </h1>
            <p className="text-neutral-700 text-sm xl:text-base mb-7">
              {t("exclusiveAlgarveVillasDescription")}
            </p>

            <BookMeeting
              buttonStyle={
                "bg-primary border-primary text-white hover:bg-black hover:text-white transition-colors"
              }
            />
          </div>

          <Image
            priority
            src="/images/book-a-meeting.png"
            width={450}
            height={450}
            alt="about-us"
            className="object-cover w-full h-72 md:w-[50%] lg:w-[47%] 2xl:w-[44%] xl:h-[390px] md:h-auto"
          />
        </div>
      </div>

      <section className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="flex flex-col items-center gap-3">
          <h4 className="uppercase font-bold text-2xl text-center text-primary">
            {t("requestAnAgentPartnership")}
          </h4>
          <Button
            asChild
            className="bg-black hover:bg-black/90 px-8 text-white transition-colors"
          >
            <Link href="/agent">{t("request")}</Link>
          </Button>
        </div>
      </section>

      <DiscoverSection />
    </>
  );
};

export default ContactPage;
