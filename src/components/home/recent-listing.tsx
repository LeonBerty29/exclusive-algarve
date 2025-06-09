import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { RecentListingType } from "@/types"
import Image from "next/image"

const RecentListing = () => {
    const recentListings: RecentListingType[] = [
        {
            id: "qwqwqwqwqwqw-232",
            imageUrl: "/images/recent-listing-1.png",
        },
        {
            id: "qwqwqwqwqwqw-235",
            imageUrl: "/images/recent-listing-2.png",
        },
        {
            id: "qwqwqwqwqwqw-237",
            imageUrl: "/images/recent-listing-3.png",
        },
        {
            id: "qwqwqwqwqwqw-267",
            imageUrl: "/images/recent-listing-2.png",
        },
        {
            id: "qwqwqwqwqwqw-290j",
            imageUrl: "/images/recent-listing-3.png",
        },
    ]
    return (
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20 pt-28 sm:!pt-28 lg:!pt-32 xl:!pt-36">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full relative"
            >
                <CarouselContent>
                    {recentListings.map((recentListing) => (
                        <CarouselItem key={recentListing.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="">
                                <Card className="p-0 bg-transparent border-none rounded-none">
                                    <CardContent className="flex items-center justify-center w-full p-0">
                                        <div className="w-full relative h-60 sm:h-54 xl:h-70">
                                            <Image
                                                src={recentListing.imageUrl}
                                                alt="Recent Listing"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute -top-16 lg:-top-20 left-0 right-0 flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="flex-1 text-white text-2xl sm:text-3xl font-medium">Our Recent Listing</h2>
                    <div className="flex gap-3">
                        <CarouselPrevious className="static translate-y-0 rounded-none bg-primary/85 border-primary/85 hover:!bg-primary hover:border-primary" />
                        <CarouselNext className="static translate-y-0 rounded-none bg-primary border-primary" />
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default RecentListing