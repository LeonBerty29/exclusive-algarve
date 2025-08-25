import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* <Link href="/" className="text-xl font-bold text-gray-900">
        <Image
          src={"/images/eav-logo-dark.svg"}
          alt="Exclusive Algarve Villas Logo"
          width={100}
          height={75}
          className="object-contain"
        />
      </Link> */}
      <h1 className={cn("text-3xl font-semibold", font.className)}>{label}</h1>
    </div>
  );
};
