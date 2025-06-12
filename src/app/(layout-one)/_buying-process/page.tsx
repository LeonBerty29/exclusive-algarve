import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-24 pb-12">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[40%] lg:min-w-[unset]">
            <h1 className="text-2xl lg:text-3xl font-normal max-w-70 mb-6">
              BUYING PROCESS IN THE ALGARVE
            </h1>
            <Image
              priority
              src="/images/recent-listing-3.png"
              width={450}
              height={450}
              alt="about-us"
              className="object-cover w-full h-40 xl:h-[390px] md:h-auto order-2 md:prder-1"
            />
            <Image
              priority
              src="/images/recent-listing-3.png"
              width={450}
              height={450}
              alt="about-us"
              className="object-cover w-full h-40  xl:h-[390px] md:h-auto order-2 md:prder-1"
            />
          </div>

          <div className="w-full lg:w-[58%] lg:min-w-[unset] md:pl-8 lg:pl-14 order-1 md:order-2">
            <p className="text-black text-sm mb-7">
              Buying a new home in a foreign country with different rules,
              legislation, language, and culture differences can seem like a
              daunting task….right? <br /> It doesn’t have to be!
            </p>
            <div className="space-y-4">
              <p className="text-neutral-700 text-sm">
                Just as yourself, many others felt the same, but before you,
                we’ve assisted hundreds of happy buyers to a new property in the
                Algarve.  This is why we offer you our many years of experience,
                knowledge and local network of professionals to make the buying
                process a pleasant experience!
              </p>
              <p className="text-neutral-700 text-sm">
                It is very important to work with professionals who are
                licensed. Whether it’s the real estate agency, builders,
                lawyers, architects etc. We highly recommend avoiding any ‘free
                lancers’ or other non-licensed services you will come across
              </p>
              <p className="text-neutral-700 text-sm">
                The property search will mostly start by scouting websites and
                property portals to get an initial feel of what your budget can
                buy in the Algarve, what is currently on the market, what are
                the options available in your preferred area(s), and finally to
                identify the properties that you find of interest.
              </p>
              <p className="text-neutral-700 text-sm">
                Choosing to work with a reliable and established agency such as
                Exclusive Algarve Villas, will give you the advantage of being
                able to profit from our knowledge of the market and our long
                standing experience.  Having already weathered various ‘storms’
                in the real estate market, we have stood solid and continue to
                be their “Portuguese link” to all our overseas clients.
              </p>
              <p className="text-neutral-700 text-sm">
                In addition, when you chose Exclusive Algarve Villas, you
                immediately get access to a lot more -  At Exclusive Algarve
                Villas, we work with a trusted partner network of local
                agencies, giving you a huge range of property options, without
                having to do any additional work. Our free ‘property hunt
                service’ gives you the opportunity to access properties that
                have not yet reached the public market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4">
          <div>
            <div className="bg-gray-100">
              <div className="w-full h-56 relative">
                <Image
                  src={"/images/lifestyle-img5.png"}
                  alt="a compass and a house"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-primary font-semibold text-lg">Search</h3>
                <p className="text-sm">
                  Nowadays, the property search will start mostly online and
                  often before clients have a booked trip to Portugal.  This is
                  an excellent way to begin the process of finding the right
                  property. We can already begin to work for you at this stage –
                  we will help you make a ‘shortlist’ of suitable homes to match
                  your needs, in your preferred area, budget and other
                  requirements. This eliminates unpleasant surprises and wasting
                  time on visiting properties that will cause you frustration.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100">
              <div className="w-full h-56 relative">
                <Image
                  src={"/images/lifestyle-img5.png"}
                  alt="a compass and a house"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-primary font-semibold text-lg">Find</h3>
                <p className="text-sm">
                  Once you have visited the selected properties, and if
                  necessary, we can adjust the search criteria until you have
                  found what you are looking for.  Once you found “the one”, we
                  then go to the next phase which is submitting an offer.
                  Although there is no official offer document that you need to
                  fill out, At Exclusive Algarve Villas we will request that
                  your offer is presented in writing, stating the exact terms
                  and conditions before we present your offer to the vendors.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100">
              <div className="w-full h-56 relative">
                <Image
                  src={"/images/lifestyle-img5.png"}
                  alt="a compass and a house"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-primary font-semibold text-lg">Buy</h3>
                <p className="text-sm">
                  (don´t celebrate just yet………..)
                  <br />
                  Once your offer is accepted, we always recommend that you work
                  with a lawyer to be able guide you through the process in your
                  language and represent your interests as best as possible.
                   Although there are International legal firms that can be
                  hired, we would recommend a Portuguese licensed local lawyer.
                  This will save time if documentation needs to be handled in
                  the local council and other entities.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-100">
              <div className="w-full h-56 relative">
                <Image
                  src={"/images/lifestyle-img5.png"}
                  alt="a compass and a house"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-primary font-semibold text-lg">Buy...</h3>
                <p className="text-sm">
                  (yes, almost there.... ;)
                  <br />
                  The most important step is in between having your offer agreed
                  and the signing of the promissory contract, in Portuguese
                  called the CPCV (Contrato de Promessa de Compra e Venda). The
                  promissory contract is the official binding contract outlining
                  the accepted terms of the sale - the price, conditions of
                  payment, dates of completion, and any other conditions both
                  parties might have agreed upon.  With the signing of this
                  contract, the initial payment on the property is then
                  required.  Generally it will take about 2 weeks for lawyers to
                  get the contract signed and to secure the deal.   Once signed,
                  you have officially accepted to purchase the property and you
                  will soon have your dream home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-14">
        <div className="flex items-center gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[40%] lg:min-w-[unset]">
            <h2 className="text-2xl lg:text-3xl font-normal max-w-70 mb-6">
              PURCHASE STEPS OUTLINE
            </h2>

            <div className="space-y-4">
              <p className="text-neutral-700 text-sm">
                Power of attorney - If you are not in Portugal, and might not be
                present for the signing of the deeds, it is recommended that you
                issue a POA (Power of Attorney).  This will allow your legal
                representative to obtain your fiscal number, sign the promissory
                contract, and deeds on your behalf.  (The POA will also be
                useful for after you acquire the property, in order to change
                all the utility bills into your name on your behalf.)
              </p>
              <p className="text-neutral-700 text-sm">
                Lawyer requests a fiscal number for the buyer(s).
                <br />
                CPCV, preparation of the promissory contract. Generally, a
                minimum of 10% deposit is required on the CPCV, unless agreed
                otherwise. With off-plan properties or ones that are under
                construction, a plan of stage payments might be put in place.
              </p>
              <p className="text-neutral-700 text-sm">
                Once both parties have agreed to the CPCV, the contract can be
                signed by buyer and vendor if they are both locals, or
                otherwise, by their lawyers via a power of attorney.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[58%] lg:min-w-[unset] md:pl-8 lg:pl-14">
            <Image
              priority
              src="/images/recent-listing-3.png"
              width={450}
              height={450}
              alt="about-us"
              className="object-cover w-full h-40 xl:h-[390px] md:h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
