import Image from "next/image";
import { ReactNode } from "react";


const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="">
      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto">
        <div className="flex items-center justify-between gap-6 flex-wrap py-6">
          <Image
            src={"/images/eav-logo-dark.svg"}
            alt="Exclusive Algarve Villas Logo"
            width={70}
            height={50}
            className="object-contain h-20 w-35 hidden lg:block"
          />
          <Image
            src={"/images/eav-logo-dark.svg"}
            alt="Exclusive Algarve Villas Logo"
            width={70}
            height={50}
            className="object-contain h-15 w-20 lg:hidden"
          />

          <div className="">Agent Details Goes Here</div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default layout;
