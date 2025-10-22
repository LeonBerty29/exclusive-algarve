import { PartnershipRequestForm } from "@/components/partnership-request/partnership-request-form";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async() => {
  const t = await getTranslations("agentPage");
  return (
    <>
      <section className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 pt-24 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            {t("agentHeading")}
          </h1>
          <PartnershipRequestForm />
        </div>
      </section>
    </>
  );
};

export default page;
