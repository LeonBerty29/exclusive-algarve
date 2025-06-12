import { Button } from "@/components/ui/button";
import { Calendar, Play, Camera, Send } from "lucide-react";
import Image from "next/image";
import ScrollableTabs from "@/components/property/scrollable-tabs";
import PropertyDetailsIcons from "@/components/property/property-details-icons";
import PropertyVideoDetails from "@/components/property/property-video-details";
import { LiaEdit } from "react-icons/lia";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactSection } from "@/components/shared/contact-section";
import DiscoverSection from "@/components/home/discover-section";
import { ProductCard } from "@/components/product/product-card";
import { Home as HomeType } from "@/types";

const page = () => {
  const propertyImage = [
    "/images/property-main-img.png",
    "/images/property-img-2.png",
    "/images/property-img-3.png",
    "/images/property-main-img.png",
    "/images/property-img-2.png",
    "/images/property-img-3.png",
  ];

  const home: HomeType = {
    imagePaths: [
      "/images/lifestyle-img1.png",
      "/images/lifestyle-img2.png",
      "/images/lifestyle-img3.png",
      "/images/lifestyle-img4.png",
      "/images/lifestyle-img5.png",
    ],
    description:
      " your private 1-bedroom villa in Seminyak, featuring a lush garden, refreshing pool, and serene ambiance. This stylish retreat boasts a fully equipped kitchen, an elegant living room, and a spacious ensuite bedroom, perfect for a relaxing getaway. Enjoy total privacy while being just minutes from Seminyak’s vibrant dining, shopping, and beach clubs.",
    location: "Lisbon",
    price: 5000000,
    userId: "1",
    favorite: false,
    favoriteId: "EAV-3956-fav",
    homeId: "EAV-3956",
    exclusive: true,
    tag: {
      name: "Reserved",
      slug: "rsv",
    },
    grossArea: 28520,
    plotSize: 453,
    amenities: {
      bedrooms: 5,
      garage: 1,
      bathrooms: 2,
    },
    liveVideo: true,
  };

  const details = {
    refCode: "EAV-000",
    location: "Ferragudo (Lagoa)",
    privateArea: 98,
    grossArea: 172,
    plotSize: 203,
  };

  const agent = {
    name: "Sarah Johnson",
    role: "Sales Consultant Responsible for this listing",
    image: "/images/team/carolina.jpg",
  };

  const totalImages = propertyImage.length;
  const remainingPhotos = totalImages - 3;

  return (
    <>
      <div className="mt-20">
        <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full">
          <div className="gap-x-6 flex mb-8">
            <div className="w-full lg:flex-1">
              <div className="w-full h-[450px] xl:h-[550px] relative">
                <Image
                  src={propertyImage[0]}
                  alt="main image"
                  fill
                  className="object-cover"
                />
                <div className="absolute z-10 bottom-4 right-4 flex gap-3">
                  <Button
                    type="button"
                    className="text-[11px] font-semibold w-full rounded-none bg-white text-black !px-6 hover:text-white hover:bg-black transition-all"
                  >
                    <LiaEdit className="h-3 w-3" />
                    VIEW FLOOR PLAN
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:w-[37%] xl:w-[30%] space-y-6 flex-col">
              <div className="relative w-full flex-1">
                {propertyImage[1] && (
                  <Image
                    src={propertyImage[0]}
                    alt="main image"
                    fill
                    className="object-cover"
                  />
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-lg transition-all">
                        <Play
                          className="w-6 h-6 text-black ml-1"
                          fill="black"
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-fit mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
                      <DialogHeader>
                        <DialogTitle className="sr-only">
                          Property Video playe
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                          Play videos of the property
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <PropertyVideoDetails />
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="relative w-full flex-1">
                {propertyImage[2] && (
                  <Image
                    src={propertyImage[2]}
                    alt="main image"
                    fill
                    className="object-cover"
                  />
                )}
                {totalImages > 3 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                        <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3 flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          {remainingPhotos} MORE PHOTOS
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="w-full mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
                      <DialogHeader>
                        <DialogTitle className="sr-only">
                          Property Images Gallery
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                          Browse through all property images
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-center min-h-[60vh] p-4">
                        <Carousel className="w-full max-w-4xl">
                          <CarouselContent>
                            {propertyImage.map((image, index) => (
                              <CarouselItem key={index}>
                                <div className="relative w-full h-[500px] md:h-[600px]">
                                  <Image
                                    src={image}
                                    alt={`Property image ${index + 1}`}
                                    fill
                                    className="object-contain w-auto h-auto"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="-left-4" />
                          <CarouselNext className="-right-4" />
                        </Carousel>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6 lg:hidden min-h-[500px] sm:min-h-[unset] flex-wrap">
            <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
              {propertyImage[1] && (
                <Image
                  src={propertyImage[0]}
                  alt="main image"
                  fill
                  className="object-cover"
                />
              )}
              {/* Play button overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-lg transition-all">
                      <Play className="w-6 h-6 text-black ml-1" fill="black" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-fit mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
                    <DialogHeader>
                      <DialogTitle className="sr-only">
                        Property Video playe
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Play videos of the property
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <PropertyVideoDetails />
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative w-full flex-1 min-w-full sm:min-w-[300px] sm:h-[400px]">
              {propertyImage[2] && (
                <Image
                  src={propertyImage[2]}
                  alt="main image"
                  fill
                  className="object-cover"
                />
              )}
              {totalImages > 3 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                      <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3 flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        {remainingPhotos} MORE PHOTOS
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full mx-auto !max-w-full !top-16 !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 overflow-y-auto !bg-white">
                    <DialogHeader>
                      <DialogTitle className="sr-only">
                        Property Images Gallery
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Browse through all property images
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center min-h-[60vh] p-4">
                      <Carousel className="w-full max-w-4xl">
                        <CarouselContent>
                          {propertyImage.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="relative w-full h-[500px] md:h-[600px]">
                                <Image
                                  src={image}
                                  alt={`Property image ${index + 1}`}
                                  fill
                                  className="object-contain w-auto h-auto"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                      </Carousel>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="gap-x-6 flex mb-8">
            <div className="w-full lg:flex-1 pt-4">
              <PropertyDetailsIcons />
              <ScrollableTabs />
            </div>

            <div className="hidden lg:flex lg:w-[37%] xl:w-[30%] flex-col pt-4">
              <div className="w-full border p-5 mb-6">
                <p className="text-xs text-gray-500 mb-5">
                  Ref Code:{" "}
                  <span className="text-sm font-bold text-mainYellowColor">
                    {details.refCode}
                  </span>
                </p>
                <div className="mb-5">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-base font-bold text-black">
                    {details.location}
                  </p>
                </div>

                <div className="flex justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs text-gray-500">Private Area</span>
                    <p className="font-bold text-base">
                      {details.privateArea} m<sup>2</sup>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Gross Area</span>
                    <p className="font-bold text-base">
                      {details.grossArea} m<sup>2</sup>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Plot Size</span>
                    <p className="font-bold text-base">
                      {details.plotSize} m<sup>2</sup>
                    </p>
                  </div>
                </div>

                <Button className="rounded-none w-full gap-5 bg-black text-white">
                  <Calendar />
                  BOOK A VISIT
                </Button>
              </div>

              <div className="bg-black text-white w-full p-6">
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold hidden">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-300">{agent.role}</p>
                  </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail address"
                      className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                    />
                  </div>

                  <div>
                    <Textarea
                      placeholder="Message"
                      rows={4}
                      className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 resize-none"
                    />
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger className="w-full bg-transparent border-0 border-b border-primary rounded-none text-white focus:border-primary focus:ring-0 focus:ring-offset-0 px-0 pb-2 [&>svg]:text-white">
                        <SelectValue
                          placeholder="Primary contact Channel"
                          className="text-white/70"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-primary">
                        <SelectItem
                          value="email"
                          className="text-white hover:bg-gray-800"
                        >
                          Email
                        </SelectItem>
                        <SelectItem
                          value="phone"
                          className="text-white hover:bg-gray-800"
                        >
                          Phone
                        </SelectItem>
                        <SelectItem
                          value="whatsapp"
                          className="text-white hover:bg-gray-800"
                        >
                          WhatsApp
                        </SelectItem>
                        <SelectItem
                          value="sms"
                          className="text-white hover:bg-gray-800"
                        >
                          SMS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox
                      id="terms"
                      className="border-primary data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-white/90 cursor-pointer"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100 rounded-none py-3 mt-6 relative flex items-center justify-center"
                  >
                    <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold">
                      REQUEST INFORMATIONS
                    </span>
                    <Send className="w-4 h-4 absolute right-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex gap-6 lg:hidden flex-wrap">
            <div className="w-full border p-5 mb-6 sm:flex-1 sm:min-w-[317px]">
              <p className="text-xs text-gray-500 mb-5">
                Ref Code:{" "}
                <span className="text-sm font-bold text-mainYellowColor">
                  {details.refCode}
                </span>
              </p>
              <div className="mb-5">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-base font-bold text-black">
                  {details.location}
                </p>
              </div>

              <div className="flex justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs text-gray-500">Private Area</span>
                  <p className="font-bold text-base">
                    {details.privateArea} m<sup>2</sup>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Gross Area</span>
                  <p className="font-bold text-base">
                    {details.grossArea} m<sup>2</sup>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Plot Size</span>
                  <p className="font-bold text-base">
                    {details.plotSize} m<sup>2</sup>
                  </p>
                </div>
              </div>

              <Button className="rounded-none w-full gap-5 bg-black text-white">
                <Calendar />
                BOOK A VISIT
              </Button>
            </div>

            <div className="bg-black text-white w-full p-6 sm:min-w-[325px] sm:flex-1">
              {/* Agent Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold hidden">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                  <p className="text-sm text-gray-300">{agent.role}</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="E-mail address"
                    className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Message"
                    rows={4}
                    className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 resize-none"
                  />
                </div>

                <div>
                  <Select>
                    <SelectTrigger className="w-full bg-transparent border-0 border-b border-primary rounded-none text-white focus:border-primary focus:ring-0 focus:ring-offset-0 px-0 pb-2 [&>svg]:text-white">
                      <SelectValue
                        placeholder="Primary contact Channel"
                        className="text-white/70"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-primary">
                      <SelectItem
                        value="email"
                        className="text-white hover:bg-gray-800"
                      >
                        Email
                      </SelectItem>
                      <SelectItem
                        value="phone"
                        className="text-white hover:bg-gray-800"
                      >
                        Phone
                      </SelectItem>
                      <SelectItem
                        value="whatsapp"
                        className="text-white hover:bg-gray-800"
                      >
                        WhatsApp
                      </SelectItem>
                      <SelectItem
                        value="sms"
                        className="text-white hover:bg-gray-800"
                      >
                        SMS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="terms-mobile"
                    className="border-primary data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <label
                    htmlFor="terms-mobile"
                    className="text-sm text-white/90 cursor-pointer"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-100 rounded-none py-3 mt-6 relative flex items-center justify-center"
                >
                  <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold">
                    REQUEST INFORMATIONS
                  </span>
                  <Send className="w-4 h-4 absolute right-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />

      <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto min-h-full py-14">
        <Carousel className="w-full flex gap-x-20 gap-y-8 flex-col lg:flex-row">
          <div className="space-y-5 max-w-[150px]">
            <div className="flex gap-3 items-center">
              <CarouselPrevious className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
              <CarouselNext className="!static rounded-none !top-0 left-0! translate-x-0 translate-y-0 bg-primary text-white border-primary" />
            </div>

            <h3 className="text-2xl font-medium">
              SIMILAR <span className="text-primary">PROPERTIES</span> OF{" "}
              <span className="text-primary">INTEREST</span>
            </h3>

            <Button className="bg-black text-white hover:opacity-85 w-full text-xs">
              VIEW ALL PROPERTIES
            </Button>
          </div>
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:basis-1/2 xl:basis-1/3"
              >
                <div className="p-1 max-w-[400px] mx-auto sm:max-w-full">
                  <ProductCard home={home} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <DiscoverSection />
    </>
  );
};

export default page;
