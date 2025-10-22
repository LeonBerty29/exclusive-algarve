import React from "react";
import { getTranslations } from "next-intl/server";

const page = async() => {
  const t = await getTranslations("termsAndConditionsPage");

  return (
    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-14 xl:py-20 space-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary underline">
        {t("termsAndConditions")}
      </h1>

      <h2 className="text-gray-900">
        <strong>{t("privacy")}</strong>
      </h2>

      <p className="text-gray-700">{t("privacyNoticeIntro1")}</p>

      <p className="text-gray-700">{t("privacyNoticeIntro2")}</p>

      <p className="text-gray-700">{t("choicesRegardingYourData")}</p>

      <p className="text-gray-700">{t("securityProcedures")}</p>

      <p className="text-gray-700">{t("correctInaccuracies")}</p>

      <h2 className="text-gray-900">
        <strong>{t("collectionAndUseOfPersonalInformation")}</strong>
      </h2>

      <p className="text-gray-700">{t("soleOwnersOfInformation")}</p>

      <p className="text-gray-700">{t("noSellingOfInformation")}</p>

      <p className="text-gray-700">{t("useInformationToRespond")}</p>

      <p className="text-gray-700">{t("contactByEmail")}</p>

      <p className="text-gray-700">{t("useAndDisclosureConditions")}</p>

      <p className="text-gray-700">{t("promoteServicesAndProducts")}</p>

      <p className="text-gray-700">{t("sendInformationalContent")}</p>

      <p className="text-gray-700">{t("ensureCompliance")}</p>

      <p className="text-gray-700">{t("complyWithLegalRequirements")}</p>

      <p className="text-gray-700">{t("provideInformationToAdvisors")}</p>

      <p className="text-gray-700">{t("processAndDefendLawsuit")}</p>

      <p className="text-gray-700">&nbsp;</p>

      <p className="text-gray-700">{t("transferInformationOnSale")}</p>

      <p className="text-gray-700">{t("checkDataHeld")}</p>

      <h2 className="text-gray-900">
        <strong>{t("security")}</strong>
      </h2>

      <p className="text-gray-700">{t("securityCommitment")}</p>

      <p className="text-gray-700">{t("bestSecurityPractices")}</p>

      <p className="text-gray-700">{t("internetDataRisk")}</p>

      <h2 className="text-gray-900">
        <strong>{t("accessCorrectionOppositionDeletionOfPersonalData")}</strong>
      </h2>

      <p className="text-gray-700">{t("rightsOfDataSubject")}</p>

      <p className="text-gray-700">{t("requestActionsByEmail")}</p>

      <p className="text-gray-700">{t("effectOfDeletionRequests")}</p>

      <h2 className="text-gray-900">
        <strong>{t("cookies")}</strong>
      </h2>

      <p className="text-gray-700">{t("cookiesStored")}</p>

      <p className="text-gray-700">{t("cookiesUsage")}</p>

      <p className="text-gray-700">{t("cookiesTurningOff")}</p>

      <h2 className="text-gray-900">
        <strong>{t("changesToThisPrivacyPolicy")}</strong>
      </h2>

      <p className="text-gray-700">{t("postingChanges")}</p>

      <p className="text-gray-700">{t("effectivenessOfChanges")}</p>

      <p className="text-gray-700">{t("objectToChangesAdvice")}</p>

      <h2 className="text-gray-900">
        <strong>{t("questionsAndContactInformation")}</strong>
      </h2>

      <p className="text-gray-700">{t("questionsContactInstructions")}</p>
    </div>
  );
};

export default page;
