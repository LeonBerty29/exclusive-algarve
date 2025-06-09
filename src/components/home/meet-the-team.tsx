import React from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RecentListingType } from "@/types";

const recentListings: RecentListingType[] = [
  {
    id: "qwqwqwqwqwqw-235",
    imageUrl: "/images/team/bart-van-linden.webp",
    name: "Bart Van Linden",
    position: "Director",
  },
  {
    id: "qwqwqwqwqwqw-237",
    imageUrl: "/images/team/marcela-boturao.webp",
    name: "Marcela Boturao",
    position: "Director",
  },
  {
    id: "qwqwqwqwqwqw-267",
    imageUrl: "/images/team/tania.jpg",
    name: "Tania",
    position: "Office Manager",
  },
  {
    id: "qwqwqwqwqwqw-268",
    imageUrl: "/images/team/natalia.jpg",
    name: "Natalia",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-269",
    imageUrl: "/images/team/melanie.jpg",
    name: "Melanie",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-270",
    imageUrl: "/images/team/vania.jpg",
    name: "Vania",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-271",
    imageUrl: "/images/team/ana.jpg",
    name: "Ana",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-272",
    imageUrl: "/images/team/carolina.jpg",
    name: "Carolina",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-273",
    imageUrl: "/images/team/melissa.jpg",
    name: "Melissa",
    position: "Sales Consultant",
  },
  {
    id: "qwqwqwqwqwqw-274",
    imageUrl: "/images/team/virginio.jpg",
    name: "Virginio",
    position: "Sales Consultant",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-10 sm:py-14 md:py-16 lg:py-24 xl:py-28 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-14 lg:pr-6 items-center">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-light max-w-sm leading-tight mb-5">
          {" "}
          Exclusive Algarve Villas{" "}
        </h2>
        <Button className="bg-gray-300 text-neutral-900 rounded-none text-sm py-5 font-light mb-3">
          MEET THE TEAM
        </Button>
        <p className="max-w-lg text-sm text-neutral-800 mt-16">
          Directors Marcela Boturao & Bart van Linden would like to welcome you
          to meet the team of Exclusive Algarve Villas. With a wealth of
          knowledge in real estate, legal and fiscal matters, we can assist you
          throughout the process of buying and selling luxury property in the
          Algarve.
          <br /> <br />
          We work with a small team of professionals who share our ideas and
          mind-set. Being a service providing company, we still believe in the
          client is king concept.
        </p>
      </div>

      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-w-[400px] mx-auto w-full sm:max-w-full sm:mx-0 relative"
        >
          <CarouselContent>
            {recentListings.map((recentListing) => (
              <CarouselItem
                key={recentListing.id}
                className="basis-[90%] sm:basis-[313px]"
              >
                <div className="">
                  <Card className="p-0 bg-transparent border-none rounded-none">
                    <CardContent className="flex flex-col items-center justify-center w-full p-0">
                      <div className="w-full relative h-[450px]">
                        <Image
                          src={recentListing.imageUrl}
                          alt={`${recentListing.name} - ${recentListing.position}`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-lg font-medium text-neutral-900 mb-1">
                          {recentListing.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {recentListing.position}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -top-16 lg:-top-20 left-0 right-0 flex items-center justify-end">
            <div className="flex gap-3">
              <CarouselPrevious className="static translate-y-0 rounded-none bg-primary/85 border-primary/85 hover:!bg-primary hover:border-primary" />
              <CarouselNext className="static translate-y-0 rounded-none bg-primary border-primary" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default MeetTheTeam;