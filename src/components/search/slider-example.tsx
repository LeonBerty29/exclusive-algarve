'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeSlider } from "./slider-range";

export function SliderExample() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const defaultValues: [number, number] = [1000, 50000];
    const min: number = 1000;
    const max: number = 5000000;
    const currency: string = "EUR";
    
    // Get initial values from URL params
    const getInitialValues = (): [number, number] => {
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        
        return [
            minPrice ? parseInt(minPrice) : defaultValues[0],
            maxPrice ? parseInt(maxPrice) : defaultValues[1]
        ];
    };
    
    const [sliderValues, setSliderValues] = useState<[number, number]>(getInitialValues);

    // Update URL when slider values change
    const updateURL = (newValues: [number, number]) => {
        const params = new URLSearchParams(searchParams.toString());
        
        // Only set params if they're different from defaults
        if (newValues[0] !== defaultValues[0]) {
            params.set('min_price', newValues[0].toString());
        } else {
            params.delete('min_price');
        }
        
        if (newValues[1] !== defaultValues[1]) {
            params.set('max_price', newValues[1].toString());
        } else {
            params.delete('max_price');
        }
        
        // Reset to first page when price changes
        params.delete('page');
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleChange = (newValues: [number, number]): void => {
        setSliderValues(newValues);
    };

    // Debounced URL update
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateURL(sliderValues);
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId);
    }, [sliderValues]);

    // Sync with URL params when they change externally
    useEffect(() => {
        setSliderValues(getInitialValues());
    }, [searchParams]);

    return (
        <div className="max-w-md mx-auto p-4">
            <RangeSlider
                defaultValue={sliderValues}
                valueLabelDisplay="on"
                label="Price Range"
                onChange={handleChange}
                min={min}
                max={max}
                step={100}
                currency={currency}
            />
        </div>
    );
}