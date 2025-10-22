import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CreatedPageSearchParamsSchema } from "@/schema";
import { CheckCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import React from "react";

interface Props {
  searchParams: Promise<{ email: string; callbackUrl?: string }>;
}

const page = async (props: Props) => {
  const t = await getTranslations("accountCreatedPage");
  const headersList = await headers();
  const referer = headersList.get("referer") || "direct";
  const url = new URL(referer);
  const path = url.pathname;
  const locale = await getLocale();

  if (
    !(
      path ===
      `/${locale}${
        routing.pathnames["/register"][
          locale as keyof (typeof routing.pathnames)["/register"]
        ]
      }`
    )
  ) {
    return redirect({
      href: "/",
      locale: locale,
    });
  }

  const { email, callbackUrl } = await props.searchParams;
  const validatePageParams = CreatedPageSearchParamsSchema.safeParse({
    email,
  });
  if (!validatePageParams.success) {
    redirect({
      href: "/login",
      locale,
    });
  }

  return (
    <div className="h-screen w-full flex flex-col align-center justify-center py-24 px-6 md:px-10 container mx-auto">
      <CheckCircle className="h-10 w-10 text-green-500 animate-bounce mx-auto" />
      <div className="spacey-2 mt-5">
        <p className="text-center text-gray-600 mb-2 font-semibold text-3xl">
          {t("accountCreatedHeading")}
        </p>
        <p className="text-gray-400 font-light text-base text-center max-w-xl mx-auto">
          {t("accountCreatedDescription")}
        </p>
      </div>
      <div className="mt-5 flex justify-center w-full">
        <Button
          asChild
          className="bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          <Link
            href={{
              pathname: "/account/resend-activation",
              query: {
                email,
                callbackUrl,
              },
            }}
          >
            {t("resendActivationLinkButton")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;