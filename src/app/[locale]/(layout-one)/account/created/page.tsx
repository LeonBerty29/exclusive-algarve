import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CreatedPageSearchParamsSchema } from "@/schema";
import { CheckCircle } from "lucide-react";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import React from "react";

interface Props {
  searchParams: Promise<{ email: string; callbackUrl?: string }>;
}

const page = async (props: Props) => {
  const headersList = await headers();
  const referer = headersList.get("referer") || "direct";
  // console.log({ referer });

  const url = new URL(referer);

  const path = url.pathname;

  // console.log({ path });

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
  // console.log({ email, callbackUrl });

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
          Account Created
        </p>
        <p className="text-gray-400 font-light text-base text-center max-w-xl mx-auto">
          An activation link has been sent to your mail. Click on it to verify
          your email and activate your account, then you can login
        </p>
      </div>

      <div className="mt-5 flex justify-center w-full">
        <Button
          asChild
          className="bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          <Link
            href={{
              pathname:"/account/resend-activation",
              query: {
                email,
                callbackUrl,
              },
            }}
          >
            Resend Activation Link
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
