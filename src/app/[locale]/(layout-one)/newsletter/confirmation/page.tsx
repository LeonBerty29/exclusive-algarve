import { confirmNewsletter } from "@/data/newsletter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/i18n/navigation";
import { Suspense } from "react";
import { ReloadBtn } from "@/components/shared/reload-btn";
import { getLocale, getTranslations } from "next-intl/server";
import { getNewsletterConfirmPageSearchParamsSchema } from "@/schema";
import { Metadata } from "next";
import { BASE_URL, GEO_POSITION, WEBSITE_NAME } from "@/config/constants";
import { routing } from "@/i18n/routing";
import { newsletterConfirmMetadata } from "@/seo-metadata/newsletter-confirm-metadata";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get localized metadata
  const metadata =
    newsletterConfirmMetadata[
      locale as keyof typeof newsletterConfirmMetadata
    ] || newsletterConfirmMetadata.en;

  // Get the localized path for the confirmation page
  const confirmPath = routing.pathnames["/newsletter/confirmation"];
  const localizedConfirmPath =
    typeof confirmPath === "string"
      ? confirmPath
      : confirmPath[locale as keyof typeof confirmPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedConfirmPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof confirmPath === "string"
        ? confirmPath
        : confirmPath[loc as keyof typeof confirmPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof confirmPath === "string"
      ? confirmPath
      : confirmPath[routing.defaultLocale as keyof typeof confirmPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  // ICBM coordinates
  const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

  return {
    title: `${metadata.title} | ${WEBSITE_NAME}`,
    description: metadata.description,
    keywords: [...metadata.keywords],
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: canonicalUrl,
      siteName: WEBSITE_NAME,
      locale: locale,
      type: "website",
    },
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    other: {
      "geo.region": "PT",
      "geo.position": `${GEO_POSITION.lat};${GEO_POSITION.lng}`,
      ICBM: ICBM,
      classification: metadata.classification,
      category: metadata.category,
      "DC.title": metadata.dcTitle,
    },
  };
}

const NewsletterConfirmationPage = async (props: Props) => {
  const { token } = await props.searchParams;
  const locale = await getLocale();
  const schemaTranslations = await getTranslations("schemaTranslations");
  const NewsletterConfirmPageSearchParamsSchema =
    getNewsletterConfirmPageSearchParamsSchema(schemaTranslations);

  const validatePageParams = NewsletterConfirmPageSearchParamsSchema.safeParse({
    token,
  });

  if (!validatePageParams.success) {
    redirect({
      href: "/",
      locale,
    });
  }

  return (
    <div className="h-screen py-24 px-6 md:px-10 container flex flex-col items-center justify-center mx-auto">
      <Suspense fallback={<ConfirmNewsletterFallback />}>
        <ConfirmNewsletter token={token} />
      </Suspense>
    </div>
  );
};

export default NewsletterConfirmationPage;

async function ConfirmNewsletter({ token }: { token: string }) {
  const t = await getTranslations("newsletterConfirmPage");
  const response = await confirmNewsletter(token);

  if (response.success) {
    return (
      <>
        <Dialog open={true}>
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-md rounded-2xl"
          >
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <DialogTitle className="text-center text-xl font-semibold">
                {t("successTitle")}
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 mt-2">
                {t("confirmationSuccessMessage")}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8"
                asChild
              >
                <Link href="/">{t("homeButton")}</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return (
      <>
        <Dialog open={true}>
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-md rounded-2xl"
          >
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-red-500" />
              </div>
              <DialogTitle className="text-center text-xl font-semibold text-red-500">
                {t("errorTitle")}
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 mt-2">
                {response.message || t("confirmationErrorMessage")}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <ReloadBtn text={t("tryAgainButton")} showHome={true} />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

async function ConfirmNewsletterFallback() {
  const t = await getTranslations("newsletterConfirmPage");

  return (
    <>
      <div className="h-full w-full flex flex-col align-center justify-center py-24 px-6 md:px-10 container mx-auto">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        <div className="spacey-2 mt-6">
          <p className="text-center text-gray-600 mt-2 font-semibold text-xl">
            {t("confirmingSubscriptionText")}
          </p>
          <p className="text-gray-400 font-light text-sm text-center">
            {t("pleaseWaitText")}
          </p>
        </div>
      </div>
    </>
  );
}
