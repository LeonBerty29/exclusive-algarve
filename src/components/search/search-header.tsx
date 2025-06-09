"use client"

import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "../ui/button"
import Image from "next/image"
import { ListFilter, ListFilterPlus } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SideFilters from "./side-filters"
import FilterTags from "./filter-tags"

const SearchHeader = () => {
    return (
        <>
            <div className="mb-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            {/* <BreadcrumbLink href="/"> */}
                            <Link href="/">Home</Link>
                            {/* </BreadcrumbLink> */}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary" />

                        <BreadcrumbItem>
                            <BreadcrumbPage>Properties</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


            <div className="bg-black py-5 text-white">
                <div className="2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                    <Button className="px-7 text-white text-xs sm:text-sm">
                        ALL PROPERTIES
                    </Button>

                    <div className="flex-col items-center gap-2 hidden sm:flex">
                        <Image src="/images/search-header-icon.png" alt="" width={25} height={25} />
                        <p className="text-xs text-center"><b>3,550</b> Properties for sale with <span className="text-primary font-semibold">Algarve Villa</span></p>
                    </div>

                    <div className="flex items-center gap-1 md:gap-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm"><ListFilter className="w-4 h-4 hidden sm:block" /> Sort by:</div>
                        <Select>
                            <SelectTrigger className="w-[180px] data-[placeholder]:text-primary" iconColor="text-white">
                                <SelectValue placeholder="Theme" defaultValue="recent" className="text-primary" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Most Recent</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>


            <div className="flex gap-5 2xl:container px-6 sm:px-8 md:px-10 lg:px-14 mx-auto py-5">
            <p className="text-sm mr-8 sm:hidden">Found <span className="text-primary font-bold">740</span> Properties</p>
                <div className="hidden sm:flex items-center gap-5 flex-wrap">
                    <FilterTags />
                </div>

                <div className="lg:hidden ml-auto">
                    <Sheet>
                        <SheetTrigger className="bg-black text-white px-4 py-2 flex items-center gap-2">Filters <ListFilterPlus className="w-4 h-4" /></SheetTrigger>
                        <SheetContent className="!w-[85vw] max-w-[550px] sm:max-w-[550px]">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Property filters</SheetTitle>
                                <SheetDescription className="sr-only">
                                    Use this filter to narrow down your search for houses
                                </SheetDescription>

                                <div className="mt-6">
                                    <div className="max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24">
                                        <div className="flex lg:hidden items-center gap-5 flex-wrap mb-6">
                                            <FilterTags />
                                        </div>
                                        <SideFilters />
                                    </div>

                                    <p>khkh</p>
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    )
}

export default SearchHeader