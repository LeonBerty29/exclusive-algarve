"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeSlider } from "./slider-range";

const DEFAULT_VALUES: [number, number] = [1000, 50000];
const MIN_PRICE = 1000;
const MAX_PRICE = 5000000;
const CURRENCY = "EUR";

export function SliderExample() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        
        return [
            minPrice ? parseInt(minPrice) : DEFAULT_VALUES[0],
            maxPrice ? parseInt(maxPrice) : DEFAULT_VALUES[1]
        ];
    });

    const handleChange = (newValues: [number, number]): void => {
        setSliderValues(newValues);
    };

    // Debounced URL update
    useEffect(() => {
        const updateURL = (newValues: [number, number]) => {
            const params = new URLSearchParams(searchParams.toString());

            // Only set params if they're different from defaults
            if (newValues[0] !== DEFAULT_VALUES[0]) {
                params.set("min_price", newValues[0].toString());
            } else {
                params.delete("min_price");
            }

            if (newValues[1] !== DEFAULT_VALUES[1]) {
                params.set("max_price", newValues[1].toString());
            } else {
                params.delete("max_price");
            }

            // Reset to first page when price changes
            params.delete("page");

            router.push(`?${params.toString()}`, { scroll: false });
        };

        const timeoutId = setTimeout(() => {
            updateURL(sliderValues);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [sliderValues, searchParams, router]); // Removed defaultValues

    // Sync with URL params when they change externally
    useEffect(() => {
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        
        const newValues: [number, number] = [
            minPrice ? parseInt(minPrice) : DEFAULT_VALUES[0],
            maxPrice ? parseInt(maxPrice) : DEFAULT_VALUES[1]
        ];
        
        setSliderValues(newValues);
    }, [searchParams]);

    return (
        <div className="max-w-md mx-auto p-4">
            <RangeSlider
                defaultValue={sliderValues}
                valueLabelDisplay="on"
                label="Price Range"
                onChange={handleChange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={100}
                currency={CURRENCY}
            />
        </div>
    );
}