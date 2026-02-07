import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fetchOwnResourcePage } from "@/data/resources";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollToTopWrapper } from "@/components/scroll-to-top-wrapper";
import { Metadata } from "next";
import {
  BASE_URL,
  EAV_TWITTER_CREATOR_HANDLE,
  GEO_POSITION,
  WEBSITE_NAME,
} from "@/config/constants";
import { routing } from "@/i18n/routing";
import { ownResourcesPageMetadata } from "@/seo-metadata/own-resource";

type Params = {
  [x: string]: string;
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const story = await fetchOwnResourcePage(slug);

    // Get metadata for current locale
    const metadata =
      ownResourcesPageMetadata[locale as keyof typeof ownResourcesPageMetadata] ||
      ownResourcesPageMetadata.en;

    if (!story) {
      return {
        title: metadata.notFoundTitle,
        description: metadata.notFoundDescription,
      };
    }

    // Parse keywords from comma-separated string
    const keywords = story.content.seo_keywords
      ? story.content.seo_keywords.split(",").map((kw: string) => kw.trim())
      : [];

    // Get the localized path for resources from routing config
    const resourcesPath = routing.pathnames["/own/[slug]"];
    const localizedResourcesPath =
      typeof resourcesPath === "string"
        ? resourcesPath
        : resourcesPath[locale as keyof typeof resourcesPath];

    // Build the localized resource path by replacing [slug] with actual slug
    const localizedPath = localizedResourcesPath.replace("[slug]", slug);

    // Build canonical URL for current locale (all locales are prefixed)
    const canonicalUrl = `${BASE_URL}/${locale}${localizedPath}`;

    // Build alternate language URLs
    const languages: Record<string, string> = {};
    routing.locales.forEach((loc) => {
      const path =
        typeof resourcesPath === "string"
          ? resourcesPath
          : resourcesPath[loc as keyof typeof resourcesPath];

      // Replace [slug] with actual slug
      const fullPath = path.replace("[slug]", slug);

      // All locales are prefixed
      languages[loc] = `${BASE_URL}/${loc}${fullPath}`;
    });

    // Add x-default using default locale
    const defaultPath =
      typeof resourcesPath === "string"
        ? resourcesPath
        : resourcesPath[routing.defaultLocale as keyof typeof resourcesPath];
    languages["x-default"] = `${BASE_URL}/${
      routing.defaultLocale
    }${defaultPath.replace("[slug]", slug)}`;

    // ICBM coordinates
    const ICBM = `${GEO_POSITION.lat}, ${GEO_POSITION.lng}`;

    // Use EAV dark logo as the default image
    const defaultImage = `${BASE_URL}/images/eav-dark-logo.png`;

    return {
      title: story.content.seo_title || story.content.title,
      description: story.content.seo_description || story.content.title,
      keywords: keywords,
      openGraph: {
        title:
          story.content.seo_title || `${story.content.title} | ${WEBSITE_NAME}`,
        description: story.content.seo_description || story.content.title,
        url: canonicalUrl,
        siteName: WEBSITE_NAME,
        images: [
          {
            url: defaultImage,
            secureUrl: defaultImage,
            type: "image/png",
            width: 1200,
            height: 630,
            alt: `${WEBSITE_NAME} - ${story.content.title}`,
          },
        ],
        locale: locale,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${story.content.title} | ${WEBSITE_NAME}`,
        description: story.content.seo_description || story.content.title,
        creator: EAV_TWITTER_CREATOR_HANDLE,
        images: [defaultImage],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
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
        "DC.title": `${metadata.dcTitlePrefix} - ${story.content.title}`,
        audience: metadata.audience,
        "article:section": metadata.articleSection,
      },
    };
  } catch (error) {
    console.log(error);
    const metadata =
      ownResourcesPageMetadata[locale as keyof typeof ownResourcesPageMetadata] ||
      ownResourcesPageMetadata.en;

    return {
      title: metadata.notFoundTitle,
      description: metadata.notFoundDescription,
    };
  }
}

const OwnResourcePage = async (props: PageProps) => {
  const params = await props.params;

  // Better null/undefined checking
  if (!params?.slug) {
    notFound();
  }

  return (
    <>
      <div className="lg:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10 pt-24">
        <ScrollToTopWrapper>
          <Suspense
            fallback={
              <div className="lg:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10">
                <Skeleton className="min-h-[80vh] w-full" />
              </div>
            }
          >
            <OwnResourceContent slug={params.slug as string} />
          </Suspense>
        </ScrollToTopWrapper>
      </div>
    </>
  );
};

export default OwnResourcePage;

async function OwnResourceContent({ slug }: { slug: string }) {
  const story = await fetchOwnResourcePage(slug);

  return (
    <>
      <StoryblokStory story={story} />
    </>
  );
}