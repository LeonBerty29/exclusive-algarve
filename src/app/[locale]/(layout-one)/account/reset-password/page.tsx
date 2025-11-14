import { getLocale, getTranslations } from "next-intl/server";
import { getResetPasswordPageSearchParamsSchema } from "@/schema";
import { redirect } from "@/i18n/navigation";
import { ResetPasswordForm } from "@/components/reset-password/reset-password-form";
import { Metadata } from "next";
import { BASE_URL, GEO_POSITION, WEBSITE_NAME } from "@/config/constants";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token: string; email: string; callbackUrl: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get the localized path for the reset password page
  const resetPasswordPath = routing.pathnames["/account/reset-password"];
  const localizedResetPasswordPath =
    typeof resetPasswordPath === "string"
      ? resetPasswordPath
      : resetPasswordPath[locale as keyof typeof resetPasswordPath];

  // Build canonical URL for current locale
  const canonicalUrl = `${BASE_URL}/${locale}${localizedResetPasswordPath}`;

  // Build alternate language URLs
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path =
      typeof resetPasswordPath === "string"
        ? resetPasswordPath
        : resetPasswordPath[loc as keyof typeof resetPasswordPath];

    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  // Add x-default using default locale
  const defaultPath =
    typeof resetPasswordPath === "string"
      ? resetPasswordPath
      : resetPasswordPath[routing.defaultLocale as keyof typeof resetPasswordPath];
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${defaultPath}`;

  const description =
    "Reset your Exclusive Algarve Villas account password. Create a new secure password to regain access to your property search account and saved listings.";

  const keywords = [
    "reset password",
    "change password",
    "exclusive algarve villas password reset",
    "new password",
    "password recovery",
    "secure password",
    "account password change",
    "update account password",
  ];

  return {
    title: `Reset Password | ${WEBSITE_NAME}`,
    description: description,
    keywords: keywords,
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
    },
  };
}

const ResetPasswordPage = async (props: Props) => {
  const { token, email, callbackUrl } = await props.searchParams;
  const locale = await getLocale();
  const t = await getTranslations("accountResetPasswordPage");
  const schemaTranslations = await getTranslations("schemaTranslations");
  const ResetPasswordPageSearchParamsSchema = getResetPasswordPageSearchParamsSchema(schemaTranslations);

  const validatePageParams = ResetPasswordPageSearchParamsSchema.safeParse({
    email,
    token,
  });

  if (!validatePageParams.success) {
    redirect({
      href: "/login",
      locale,
    });
  }

  return (
    <div className="h-screen py-24 px-6 md:px-10 container flex flex-col items-center justify-center mx-auto">
      <div className="space-y-10 mt-5 shadow-xl p-8 rounded-3xl mx-auto border-gray-100 w-full max-w-2xl">
        <div className="">
          <p className="text-gray-600 mb-2 font-semibold text-xl">
            {t("resetPasswordHeading")}
          </p>
        </div>

        <ResetPasswordForm
          token={token}
          email={email}
          callbackUrl={callbackUrl}
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;