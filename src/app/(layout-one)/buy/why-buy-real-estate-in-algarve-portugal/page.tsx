// import Image from "next/image";
import DiscoverSection from "@/components/home/discover-section";
import { ContactForm } from "@/components/shared/contact-form";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <section className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-x-10 lg:gap-x-16 xl:gap-x-20 gap-y-6 mb-10 lg:mb-12">
          <div className="flex-1 space-y-6">
            <Separator className="mb-6" />
            <h1 className="text-lg md:text-xl lg:text-3xl font-bold mb-6 lg:mb-10 max-w-4xl">
              Why invest in Real Estate in Portugal
            </h1>
            <p className="text-gray-600">
              In the Algarve, there is plenty of choice in terms of property
              types ranging from apartments and villas with a sea view to luxury
              houses and condos. The Algarve is one of the top places in
              Portugal to purchase property or own real estate, with several
              positive aspects to take into account:
            </p>
          </div>
          <div className="flex-1 flex flex-col space-y-6">
            <div className="w-full aspect-square relative rounded-xl order-2 md:order-1">
              <Image
                src="/images/buy-real-estate-portugal.png"
                fill
                alt="online-marketing"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <h3 className="text-lg lg:text-xl font-semibold flex-1">
            300 sunny days a year!
          </h3>
          <p className="flex-2 text-black/70">
            Algarve is one of the sunniest regions in the world with a little
            more than 300 days of sunshine per year, making it a pleasant place
            to live all year round due to its temperate Mediterranean climate.
            The summers are quite long, often lasting until October, and even in
            winter, the climate in southern Portugal is quite pleasant.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              200 km of coastline and dozens of beautiful beaches!
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className=" text-black/70">
              It is too often forgotten that the beaches of the Algarve are
              among the most beautiful in Europe and more broadly in the
              Mediterranean basin.
            </p>
            <p className="text-black/70">
              They are very diversified: sometimes imposing, stretching to
              infinity, sometimes intimate, locked between cliffs, inlets, on
              islands, lagoons, some known, others secret and only accessible to
              those who know how to get there. The beaches are extremely clean
              and the water is transparent, generally calm, especially in
              summer, with a temperate water temperature
            </p>
            <p className="text-black/70">
              There is also a very high quality tourist infrastructure to
              welcome seaside visitors (parking, signage, toilets, first aid
              stations,…).
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              Culture & Gastronomy
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className=" text-black/70">
              Monuments, secular dwellings, religious rituals and craft markets
              represent a heritage that makes the Algarve a region that is not
              just about its miles of beaches.
            </p>
            <p className="text-black/70">
              Many towns and villages are of cultural interest because of the
              beauty of traditional architecture or the presence of historical
              monuments. As for gastronomy, harvesting the best that the sea and
              land have to offer is enough: fish and seafood
              &quot;caldeiradas&quot;, clam &quot;cataplanas&quot;;
              confectionery made from figs and almonds, and wines from the DOC
              sub-regions of Lagos, Portimão, Lagoa and Tavira.
            </p>
            <p className="text-black/70">
              It is no coincidence that the Algarve region is the Portuguese
              region with the highest concentration of Michelin stars.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              A golfer’s paradise!
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className="text-black/70">
              The Algarve was voted “Best Golf Destination in the World” by the
              I.A.G.T.O. (International Association of Golf Tour Operators). The
              first golf course in the region opened in 1966 and of the 70 or so
              golf courses in Portugal, 34 are located in the Algarve within a
              maximum radius of 120 Kilometres. In other words, this region is a
              paradise for any golfer looking to discover new playgrounds
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              Easy accessibility
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className="text-black/70">
              With plenty of low cost airlines offering flights to
              Algarve&apos;s Faro International Airport, and flight times of
              just a few hours from most of Western Europe, the Algarve is
              easily accessible. Flights land at Faro, the capital of the
              Algarve, which is centrally located., so it is then very easy to
              reach the whole region from the main seaside resorts: Quinta do
              Lago, Vale de Lobo, Albufeira, Armaçao de Pêra, Carvoeiro, Alvor
              or Lagos. Whatever the seaside council you choose, you can enjoy a
              day trip, distances are never a problem since the Algarve is only
              a maximum 140 km wide from west to east.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              Safe & Politically stable
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className="text-black/70">
              Voted in the top three most peaceful countries in the world 2019,
              Portugal has one of the lowest population to land densities in
              Europe. Politically, Portugal is stable, with one of the lowest
              crime rates in Europe and the capital, Lisbon, has been voted the
              safest in Europe. This creates an increasing demand for properties
              and rentals
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-6 md:px-10 md:py-8 text-black gap-6 lg:gap-10 mb-8 border-b border-gray-300">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg lg:text-xl font-semibold">
              Solid investment
            </h3>
          </div>
          <div className="space-y-3 flex-2">
            <p className="text-black/70">
              Owning property in Portugal can provide a solid financial
              investment.
            </p>
            <p className="text-black/70">
              With more and more tourists visiting Portugal each year, renting
              your Portuguese property to cover the annual costs of owning a
              holiday home is an attractive option. The strict planning
              regulations secure the natural beauty of the sandy beaches, open
              countryside and forests, which in turn limits the supply of new
              properties and maintains the demand of property for sale high!
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-800">
            In addition to the points described above, there are still more
            benefits that make Portugal, namely the Algarve, such an attractive
            place for real estate investment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-10">
            <div className="p-8 bg-gray-100 rounded-xl space-y-6 aspect-3/1">
              <p className="text-lg font-semibold text-primary">01</p>
              <p className="text-gray-700">
                Portugal offers a very high quality of life and lower cost of
                living in comparison to other European countries;
              </p>
            </div>

            <div className="p-8 bg-gray-100 rounded-xl space-y-6 aspect-3/1">
              <p className="text-lg font-semibold text-primary">02</p>
              <p className="text-gray-700">
                Public infrastructure such as healthcare and transportation are
                widely available and accessible;
              </p>
            </div>

            <div className="p-8 bg-gray-100 rounded-xl space-y-6 aspect-3/1">
              <p className="text-lg font-semibold text-primary">03</p>
              <p className="text-gray-700">
                High-quality education and healthcare services
              </p>
            </div>

            <div className="p-8 bg-gray-100 rounded-xl space-y-6 aspect-3/1">
              <p className="text-lg font-semibold text-primary">04</p>
              <p className="text-gray-700">
                A large number of English speakers which makes communication
                very easy.
              </p>
            </div>
          </div>

          <p className="mb-4 text-gray-800">
            In short, from the famous white houses of rural villages to the
            large villas in Quinta do Lago, Loulé, Almancil or Lagos, this is
            your chance to dive in, settle in Portugal and enjoy the mild warm
            climate of the sunny Algarve
          </p>

          <p className="text-gray-800">
            Whether in a property on a golf course, a house with a sea view, a
            villa with a swimming pool, an apartment with a terrace, our team
            will help you find the property that suits you.
          </p>
        </div>
      </section>

      <div className="lg:container mx-auto px-6 md:px-12 lg:px-14 py-14 xl:pb-20">
        <div className="max-w-[800px] mx-auto">
          <ContactForm
            theme="light"
            titleStyling="text-center"
            submitBtnStyling="flex mx-auto"
          />
        </div>
      </div>

      <DiscoverSection />
    </>
  );
};

export default page;
