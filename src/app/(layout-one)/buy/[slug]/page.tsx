import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fetchBuyResourcePage } from "@/data/resources";
import { Skeleton } from "@/components/ui/skeleton";

type Params = {
  [x: string]: string | string[];
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

const BuyResourcePage = async (props: PageProps) => {
  const params = await props.params;

  // Better null/undefined checking
  if (!params?.slug) {
    notFound();
  }

  return (
    <>
      <Suspense
        fallback={
          <main className="lg:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-10">
            <Skeleton className="min-h-[80vh] w-full" />
          </main>
        }
      >
        <BuyResourceContent slug={params.slug as string} />
      </Suspense>
    </>
  );
};

export default BuyResourcePage;

async function BuyResourceContent({ slug }: { slug: string }) {
  const story = await fetchBuyResourcePage(slug);
  return (
    <>
      <StoryblokStory story={story} />
    </>
  );
}
