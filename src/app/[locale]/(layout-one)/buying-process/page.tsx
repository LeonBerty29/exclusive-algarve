import { MultiStepPropertyForm } from "@/components/buying-process/property-request-multistep-form";
import Image from "next/image";
import React from "react";
import { TbBulbFilled } from "react-icons/tb";

const page = () => {
  return (
    <>
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pt-24">
        <div className="flex gap-y-5 justify-between py-5 md:py-8 flex-wrap">
          <div className="w-full lg:w-[40%] lg:min-w-[unset]">
            <h1 className="text-2xl lg:text-3xl max-w-70 mb-6 font-semibold">
              BUYING PROCESS IN THE ALGARVE
            </h1>
            <div className="pr-12 lg:px-0">
              <Image
                priority
                src="/images/buying-process/buying-process-1.png"
                width={459}
                height={250}
                alt="about-us"
                className="object-cover w-full aspect-video"
              />
              <Image
                priority
                src="/images/buying-process/buying-process-2.png"
                width={450}
                height={450}
                alt="about-us"
                className="object-cover w-full aspect-video -translate-1/2 translate-x-12"
              />
            </div>
          </div>

          <div className="w-full lg:w-[58%] lg:min-w-[unset] md:pl-8 lg:pl-14 order-1 md:order-2">
            <p className="text-black text-sm font-medium mb-7">
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

      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto pb-16">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4">
          <li>
            <div className="bg-gray-100">
              <div className="w-full relative">
                <Image
                  width={646}
                  height={236}
                  src={"/images/buying-process/buying-process-search.png"}
                  alt="a compass and a house"
                  className="object-cover h-auto w-full"
                />

                <p className="absolute bottom-5 left-3 font-bold text-5xl bg-gradient-to-b from-white via-white/20 to-transparent bg-clip-text text-transparent">
                  01
                </p>
              </div>

              <div className="p-6 lg:p-10 space-y-3">
                <h3 className="text-primary font-semibold text-lg lg:text-2xl">
                  Search
                </h3>
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
          </li>
          <li>
            <div className="bg-gray-100">
              <div className="w-full relative">
                <Image
                  width={646}
                  height={236}
                  src={"/images/buying-process/buying-process-find.png"}
                  alt="a compass and a house"
                  className="object-cover h-auto w-full"
                />
                <p className="absolute bottom-5 left-3 font-bold text-5xl bg-gradient-to-b from-white via-white/20 to-transparent bg-clip-text text-transparent">
                  02
                </p>
              </div>

              <div className="p-6 lg:p-10 space-y-3">
                <h3 className="text-primary font-semibold text-lg lg:text-2xl">
                  Find
                </h3>
                <p className="text-sm">
                  Once you have visited the selected properties, and if
                  necessary, we can adjust the search criteria until you have
                  found what you are looking for.  Once you found “the one”, we
                  then go to the next phase which is submitting an offer.
                  Although there is no official offer document that you need to
                  your offer is presented in writing, stating the exact terms
                  and conditions before we present your offer to the vendors.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="bg-gray-100">
              <div className="w-full relative">
                <Image
                  width={646}
                  height={236}
                  src={"/images/buying-process/buying-process-buy.png"}
                  alt="a compass and a house"
                  className="object-cover h-auto w-full"
                />

                <p className="absolute bottom-5 left-3 font-bold text-5xl bg-gradient-to-b from-white via-white/20 to-transparent bg-clip-text text-transparent">
                  03
                </p>
              </div>

              <div className="p-6 lg:p-10 space-y-3">
                <h3 className="text-primary font-semibold text-lg lg:text-2xl">
                  Buy
                </h3>
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
          </li>
          <li>
            <div className="bg-gray-100">
              <div className="w-full relative">
                <Image
                  width={646}
                  height={236}
                  src={"/images/buying-process/buying-process-finalize.png"}
                  alt="a compass and a house"
                  className="object-cover h-auto w-full"
                />

                <p className="absolute bottom-5 left-3 font-bold text-5xl bg-gradient-to-b from-white via-white/20 to-transparent bg-clip-text text-transparent">
                  04
                </p>
              </div>

              <div className="p-6 lg:p-10 space-y-3">
                <h3 className="text-primary font-semibold text-lg lg:text-2xl">
                  Buy...
                </h3>
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
          </li>
        </ol>
      </div>

      <div className="2xl:container pt-0 pb-6 px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-14">
        <div className="flex items-center gap-y-5 justify-between pt-0 pb-6 md:py-8 flex-wrap">
          <div className="w-full md:w-[60%] lg:w-[48%] lg:min-w-[unset]">
            <h2 className="text-2xl lg:text-3xl font-semibold max-w-70 mb-6">
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

          <div className="w-full hidden md:block md:w-[38%] lg:min-w-[unset] md:pl-8 lg:pl-14">
            <Image
              priority
              src="/images/buying-process/purchase-step.png"
              width={344}
              height={100}
              alt="about-us"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="2xl:container pt-0 pb-6 px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-14">
        <div className="flex flex-col md:flex-row gap-y-5 gap-x-12 lg:gap-x-24 pt-0 pb-6 md:py-8">
          <p className="text-7xl font-semibold text-primary tracking-tighter opacity-50">
            01
          </p>
          <div className="w-full">
            <h2 className="text-lg lg:text-xl font-semibold max-w-70 mb-6">
              BUY & OWN
            </h2>

            <div className="space-y-4 max-w-[750px]">
              <p className="text-neutral-700 text-sm">
                Before you buy and own your property, the taxman will require
                that the IMT purchase tax and stamp duty are paid. Without this
                tax payment the deeds can’t take place. The invoice for this tax
                payment is issued by the lawyer or the notary, and proof of
                payment is required at the deeds.  Click here to see the
                purchase costs & taxes.
              </p>
              <p className="text-neutral-700 text-sm">
                Deeds can be done as quickly as 2 weeks or as slow as weeks or
                months. There is no rule that determines the timeline of this
                process. The timing is determined by the needs of the buyer and
                seller, and the workload and speed of the legal representatives
                involved. Generally the deeds are scheduled between 2-6 weeks
                after the promissory contract has been signed. We always
                recommend to the buyer to inspect the property prior to the
                deeds to confirm that the property is being signed over in a
                clean and good condition to be moved into, as well as if there
                is inventory included in the sale, that it is confirmed and in
                acceptable condition.
              </p>
              <p className="text-neutral-700 text-sm">
                Deeds are done at a public notary office.  Either party can
                select the notary.  There is no restriction on the council or
                area where it must be done.  At this stage, the buyer must
                provide the payment for the remainder of the purchase price.
                 Commonly done by a certified cheque, or bank cheque.  (Must be
                ordered in advance).  Once the deeds have been signed, the new
                owner of the property receives the keys and all respective
                accesses to the property. 
              </p>
              <p className="text-neutral-700 text-sm">
                **** due to the new regulations implemented for the prevention
                of Money Laundering, all notaries and Real estate Agencies must
                obtain personal documentation on the parties involved and all
                real estate transactions are then reported to the Real estate
                and Construction institute (IMPIC) <br /> The notary will then
                officially register the property to your name at the Land
                Registry office and tax department.  Within a few weeks the new
                registration documents will be ready.
              </p>

              <div className="bg-black/90 text-white p-3 flex items-center gap-6 flex-nowrap w-fit mt-10">
                <div className="p-3 bg-neutral-800/75 w-fit">
                  <TbBulbFilled className="h-5 w-5 fill-primary" />
                </div>

                <div>
                  <h4 className="text-primary font-semibold text-base">Tips</h4>
                  <p className="text-sm text-white/75">
                    Always ask for a copy of the deed at the notary, or your
                    lawyer.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-y-5 gap-x-12 lg:gap-x-24 pt-0 pb-6 md:py-8 mt-5 md:mt-14 lg:mt-24">
              <p className="text-7xl font-semibold text-primary tracking-tighter opacity-50">
                02
              </p>
              <div className="w-full">
                <h2 className="text-lg lg:text-xl font-semibold max-w-70 mb-6">
                  REGISTRATION OF PROPERTY
                </h2>

                <div className="space-y-4 max-w-[750px]">
                  <p className="text-neutral-700 text-sm">
                    The tax office and land registry departments will be
                    notified of the change of ownership of the property and
                    issue new documents in your name(s). <br />
                    All Utility bills, such as water, electricity, gas, alarm,
                    internet, etc will also have to be changed into your name.
                     Meter readings are taken before the deeds and communicated
                    to both buyer and sellers (lawyer) so that any adjustments
                    on the monthly payments can be balanced out between the
                    buyer and the vendor, based on the date of change of
                    ownership of the property.
                  </p>
                  <p className="text-neutral-700 text-sm">
                    Generally internet, phone, paid TV etc will not be possible
                    to change contract and you will need to contract these
                    services.
                  </p>
                  <p className="text-neutral-700 text-sm">
                    Exclusive Algarve Villas recommends always using a local
                    licensed lawyer when buying or selling real estate in
                    Portugal.If you have any questions about the buying process
                    and would like to be contacted by a member of our sales
                    team, please leave your name and contact details below and
                    we will get in touch with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="2xl:container pt-0 py-14 px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-14">
        <MultiStepPropertyForm />
      </div>
    </>
  );
};

export default page;
