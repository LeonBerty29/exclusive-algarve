"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeSlider } from "./slider-range";

const DEFAULT_VALUES: [number, number] = [1000, 50000];
const MIN_PRICE = 1000;
const MAX_PRICE = 5000000;
const CURRENCY = "EUR";

export function SliderExample() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);

  const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    return [
      minPrice ? parseInt(minPrice) : DEFAULT_VALUES[0],
      maxPrice ? parseInt(maxPrice) : DEFAULT_VALUES[1],
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

      // FIXED: Only reset to first page when price VALUES actually change
      // Check if the values are different from the previous ones
      const previousValues = previousValuesRef.current;
      const valuesChanged =
        !previousValues ||
        previousValues[0] !== newValues[0] ||
        previousValues[1] !== newValues[1];

      if (valuesChanged && previousValues) {
        // Only delete page if this is a user-initiated price change
        params.delete("page");
      }

      // Update the ref with current values
      previousValuesRef.current = newValues;

      router.push(`?${params.toString()}`, { scroll: false });
    };

    const timeoutId = setTimeout(() => {
      updateURL(sliderValues);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [sliderValues, searchParams, router]);

  // Sync with URL params when they change externally
  useEffect(() => {
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    const newValues: [number, number] = [
      minPrice ? parseInt(minPrice) : DEFAULT_VALUES[0],
      maxPrice ? parseInt(maxPrice) : DEFAULT_VALUES[1],
    ];

    // Only update state if values actually changed
    if (newValues[0] !== sliderValues[0] || newValues[1] !== sliderValues[1]) {
      setSliderValues(newValues);
    }
  }, [searchParams]); // Removed sliderValues from dependency to prevent infinite loops

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
