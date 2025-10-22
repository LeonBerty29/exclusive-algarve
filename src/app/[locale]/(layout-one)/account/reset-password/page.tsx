import { getLocale, getTranslations } from "next-intl/server";
import { ResetPasswordPageSearchParamsSchema } from "@/schema";
import { redirect } from "@/i18n/navigation";
import { ResetPasswordForm } from "@/components/reset-password/reset-password-form";

interface Props {
  searchParams: Promise<{ token: string; email: string; callbackUrl: string }>;
}

const ResetPasswordPage = async (props: Props) => {
  const { token, email, callbackUrl } = await props.searchParams;
  const locale = await getLocale();
  const t = await getTranslations("accountResetPasswordPage");

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
