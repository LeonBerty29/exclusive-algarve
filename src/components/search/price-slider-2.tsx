"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Ranges } from "@/types/property";
import { PRICE_SLIDER_STEP } from "@/config/constants";
import { Slider } from "../ui/slider";
import { PriceFormat } from "../shared/price-format";

const CURRENCY = "EUR";

export function PriceSlider({ priceRange }: { priceRange: Ranges["price"] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousValuesRef = useRef<[number, number] | undefined>(undefined);

  const [sliderValues, setSliderValues] = useState<
    [number, number]
  >(() => {
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    return [
      minPrice ? parseInt(minPrice) : priceRange.min,
      maxPrice ? parseInt(maxPrice) : priceRange.max,
    ];
  });

  const handleChange = (newValues: [number, number]): void => {
    const updateURL = (newValues: [number, number]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Only set params if they're different from defaults
      if (newValues[0] !== priceRange.min) {
        params.set("min_price", newValues[0].toString());
      } else {
        params.delete("min_price");
      }

      // FIXED: Compare against the initial default value, not priceRange.max
      if (newValues[1] !== priceRange.max) {
        params.set("max_price", newValues[1].toString());
      } else {
        params.delete("max_price");
      }

      // Only reset to first page when price VALUES actually change
      const previousValues = previousValuesRef.current;
      const valuesChanged =
        !previousValues ||
        previousValues[0] !== newValues[0] ||
        previousValues[1] !== newValues[1];

      if (valuesChanged && previousValues) {
        params.delete("page");
      }

      // Update the ref with current values
      previousValuesRef.current = newValues;

      router.push(`?${params.toString()}`, { scroll: false });
    };

    updateURL(newValues);
  };

  useEffect(() => {
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    const newValues: [number, number] = [
      minPrice ? parseInt(minPrice) : priceRange.min,
      maxPrice ? parseInt(maxPrice) : priceRange.max,
    ];

    setSliderValues(newValues);
  }, [searchParams, priceRange.min, priceRange.max]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-5 justify-between">
        <p>
          <PriceFormat
            amount={sliderValues[0]}
            currency={CURRENCY}
            className="font-normal text-base"
            // customSymbol={customSymbol}
          />
        </p>
  
        <p>
        <PriceFormat
            amount={sliderValues[1]}
            currency={CURRENCY}
            className="font-normal text-base"
            // customSymbol={customSymbol}
          />
        </p>
      </div>
      <Slider
        className=""
        defaultValue={[priceRange.min, priceRange.max]}
        min={priceRange.min}
        max={priceRange.max}
        step={PRICE_SLIDER_STEP}
        onValueChange={(values) => {
          setSliderValues([values[0], values[1]]);
        }}
        onValueCommit={handleChange}
        value={sliderValues}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
