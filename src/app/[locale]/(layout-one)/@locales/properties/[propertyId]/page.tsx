import { PropertiesLanguageSwitcherDropdown } from "@/components/shared/properties-language-switcher-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { getProperty } from "@/data/property";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{ propertyId: string }>;
}

const PropertyIdLocales = (props: Props) => {
  return (
    <>
      <Suspense fallback={<Skeleton className="h-10 w-16" />}>
        <PropertiesLanguageSwitcher {...props} />
      </Suspense>
    </>
  );
};

export default PropertyIdLocales;

async function PropertiesLanguageSwitcher(props: Props) {
  const { propertyId } = await props.params;
  const response = await getProperty(propertyId);
  const locale = await getLocale();

  if ("redirect" in response && response.redirect) {
    redirect({
      href: {
        pathname: "/properties/[slug]",
        params: { slug: response.new_slug! },
      },
      locale,
    });
  }
  const slugs = response.data!.seo.slugs;

  return (
    <>
      <PropertiesLanguageSwitcherDropdown slugs={slugs} />
    </>
  );
}
