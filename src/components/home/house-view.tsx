"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HouseView = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 h-full w-full before:absolute before:inset-0 before:bg-black/60 before:bg-opacity-50 before:content-[''] before:z-10">
        <Image
          src="/images/house-view.png"
          width={1920}
          height={1080}
          alt="Algarve home"
          className=" h-full w-full object-cover"
        />

        <div className="absolute left-0 right-0 bottom-0 z-20 flex justify-center">
          <motion.div
            className="container px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-14 xl:py-20  text-white z-22 flex flex-col sm:flex-row items-end w-full gap-9"
            initial={{
              y: 100,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex-1">
              <div>
                <h2 className="text-xl font-normal mb-8 max-w-sm uppercase">
                  Contemporary 5 bedroom mansion with pool near the beach
                </h2>
                <p className="text-sm font-light leading-relaxed max-w-xl">
                  Contemporary new villa within walking distance to a few of the
                  most amazing beaches in Porches. This Hollywood mansion style
                  property features double height ceilings with lofty glass
                  sliding doors to capture the indoor and outdoor lifestyle.
                </p>
              </div>
            </div>
            {/* <p className="mb-6 text-3xl font-semibold">{property.price}</p>
                                <p className="mb-8 text-lg opacity-90">{property.specs}</p> */}

            <motion.button
              className="group flex text-xs font-light items-center gap-2 rounded-none bg-[#fff] px-5 py-[10px] text-[#000] border transition-colors hover:bg-primary hover:border-primary hover:text-white w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              HAVE A LOOK
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HouseView;
