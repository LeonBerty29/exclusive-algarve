"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function HeroSearch() {
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState("");
    const [selectedBathrooms, setSelectedBathrooms] = useState("");
    const [selectedPool, setSelectedPool] = useState("");
    const [selectedGarage, setSelectedGarage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);

    const regions = ["Downtown", "Suburbs", "Waterfront", "City Center", "Rural"];
    const types = ["Apartment", "House", "Condo", "Villa", "Studio"];
    const priceRanges = [
        "Under $100k",
        "$100k - $300k",
        "$300k - $500k",
        "$500k - $1M",
        "Above $1M"
    ];
    const bedroomOptions = ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];
    const bathroomOptions = ["1 Bathroom", "2 Bathrooms", "3 Bathrooms", "4+ Bathrooms"];
    const poolOptions = ["Yes", "No"];
    const garageOptions = ["No Garage", "1 Car", "2 Cars", "3+ Cars"];

    const handleClear = () => {
        setSelectedRegion("");
        setSelectedType("");
        setSelectedPriceRange("");
        setSelectedBedrooms("");
        setSelectedBathrooms("");
        setSelectedPool("");
        setSelectedGarage("");
        setSearchQuery("");
    };

    const handleSearch = () => {
        // Handle search logic here
        console.log({
            region: selectedRegion,
            type: selectedType,
            priceRange: selectedPriceRange,
            bedrooms: selectedBedrooms,
            bathrooms: selectedBathrooms,
            pool: selectedPool,
            garage: selectedGarage,
            query: searchQuery
        });
    };

    const handleAdvancedToggle = () => {
        setShowAdvanced(!showAdvanced);
    };

    return (
        <>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl leading-snug font-extralight text-white mb-6 text-center">
                FIND YOUR DREAM HOME <br />
                PROPERTY IN ALGARVE
            </h1>
            <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-black/30 shadow-lg">

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Search Controls */}
                    <div className="flex-1 space-y-4">
                        {/* Main Dropdowns Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Region Select */}
                            <div className="space-y-1">
                                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                    <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                        <SelectValue placeholder="Region" className="text-left  data-[placeholder]:!text-white text-white" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem key={region} value={region}>
                                                {region}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Type Select */}
                            <div className="space-y-1">
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                        <SelectValue placeholder="Type" className="text-left  data-[placeholder]:!text-white text-white" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price Range Select */}
                            <div className="space-y-1">
                                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                                    <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                        <SelectValue placeholder="Price Range" className="text-left  data-[placeholder]:!text-white text-white" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priceRanges.map((range) => (
                                            <SelectItem key={range} value={range}>
                                                {range}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Bedrooms Select */}
                            <div className="space-y-1">
                                <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                                    <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                        <SelectValue placeholder="Bedrooms" className="text-left  data-[placeholder]:!text-white text-white" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bedroomOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Search Input Row with Advanced Options */}
                        <div className={`grid gap-4 items-end ${showAdvanced ? 'grid-cols-1 lg:grid-cols-5' : 'grid-cols-1'}`}>
                            {/* Search Input */}
                            <div className={showAdvanced ? "lg:col-span-2" : "w-full"}>
                                <Input
                                    type="text"
                                    placeholder="Free search / Ref. Number"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 placeholder:text-white focus:border-primary focus:ring-0"
                                />
                            </div>

                            {/* Advanced Search Options - Show when advanced is toggled */}
                            {showAdvanced && (
                                <>
                                    {/* Bathrooms Select */}
                                    <div className="space-y-1">
                                        <Select value={selectedBathrooms} onValueChange={setSelectedBathrooms}>
                                            <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                                <SelectValue placeholder="Bathrooms" className="text-left  data-[placeholder]:!text-white text-white" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bathroomOptions.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Pool Select */}
                                    <div className="space-y-1">
                                        <Select value={selectedPool} onValueChange={setSelectedPool}>
                                            <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                                <SelectValue placeholder="Pool" className="text-left  data-[placeholder]:!text-white text-white" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {poolOptions.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Garage Select */}
                                    <div className="space-y-1">
                                        <Select value={selectedGarage} onValueChange={setSelectedGarage}>
                                            <SelectTrigger color="text-primary" className="text-white  data-[placeholder]:!text-white w-full bg-transparent border-0 border-b border-primary rounded-none px-0 py-3 h-auto focus:border-primary focus:ring-0">
                                                <SelectValue placeholder="Garage" className="text-left data-[placeholder]:!text-white  text-white" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {garageOptions.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex flex-col gap-3 justify-between lg:w-48">
                        {/* Cancel and Search Buttons */}
                        <div className="flex gap-2">
                            <Button
                                onClick={handleClear}
                                className="flex-1 bg-neutral-800 rounded-none text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSearch}
                                className="flex-1 bg-primary rounded-none text-white"
                            >
                                Search
                            </Button>
                        </div>

                        {/* Advanced Search Button - Full Width */}
                        <Button
                            variant="outline"
                            onClick={handleAdvancedToggle}
                            className={cn("text-white w-full bg-transparent border border-white hover:bg-white hover:text-black rounded-none", showAdvanced && "bg-white text-black hover:bg-white/80 hover:border-white/80")}
                        >
                            {showAdvanced ? "Hide Advanced" : "Advanced Search"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}