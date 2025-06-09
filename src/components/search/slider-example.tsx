'use client'
import { useState } from "react";
import { RangeSlider } from "./slider-range";

export function SliderExample() {
    const defaultValues: [number, number] = [1000, 50000];
    const min: number = 1000;
    const max: number = 5000000;
    const [sliderValues, setSliderValues] = useState<[number, number]>(defaultValues);
    const currency: string = "EUR";

    const handleChange = (newValues: [number, number]): void => {
        setSliderValues(newValues);
        console.log('New values:', newValues);
    };

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