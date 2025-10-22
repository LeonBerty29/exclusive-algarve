import { resendActivationLink } from "@/data/user";
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
import { ResendActivatePageSearchParamsSchema } from "@/schema";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

interface Props {
  searchParams: Promise<{ token: string; email: string; callbackUrl: string }>;
}

const AccountActivationPage = async (props: Props) => {
  const headersList = await headers();
  const locale = await getLocale();
  const referer = headersList.get("referer") || "direct";

  const url = new URL(referer);
  const path = url.pathname;

  if (
    !(
      path ===
        `/${locale}${
          routing.pathnames["/login"][
            locale as keyof (typeof routing.pathnames)["/login"]
          ]
        }` ||
      path ===
        `/${locale}${
          routing.pathnames["/account/created"][
            locale as keyof (typeof routing.pathnames)["/account/created"]
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

  const validatePageParams = ResendActivatePageSearchParamsSchema.safeParse({
    email,
  });

  if (!validatePageParams.success) {
    redirect({
      href: "/login",
      locale,
    });
  }
  return (
    <div className="h-screen py-24 px-6 md:px-10 container flex flex-col items-center justify-center mx-auto">
      <Suspense fallback={<ActivateUserFallback />}>
        <ResendActivation email={email} callbackUrl={callbackUrl} />
      </Suspense>
    </div>
  );
};

export default AccountActivationPage;

async function ResendActivation({
  email,
  callbackUrl,
}: {
  email: string;
  callbackUrl: string;
}) {
  const t = await getTranslations("accountResendActivationPage");
  const response = await resendActivationLink(email);

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
                {response.message || t("successMessage")}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8"
                asChild
              >
                <Link
                  href={{
                    pathname: "/login",
                    query: {
                      callbackUrl: callbackUrl,
                    },
                  }}
                >
                  {t("loginButton")}
                </Link>
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
                {response.message || t("errorMessage")}
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

async function ActivateUserFallback() {
  const t = await getTranslations("accountResendActivationPage");
  return (
    <>
      <div className="h-full w-full flex flex-col align-center justify-center py-24 px-6 md:px-10 container mx-auto">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        <div className="spacey-2 mt-6">
          <p className="text-center text-gray-600 mt-2 font-semibold text-xl">
            {t("sendingActivationEmail")}
          </p>
          <p className="text-gray-400 font-light text-sm text-center">
            {t("pleaseWaitMessage")}
          </p>
        </div>
      </div>
    </>
  );
}
