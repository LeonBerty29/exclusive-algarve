// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { RangeSlider } from "./slider-range";
// import { Ranges } from "@/types/property";
// import { PRICE_SLIDER_STEP } from "@/config/constants";

// const CURRENCY = "EUR";

// export function PriceSlider({ priceRange }: { priceRange: Ranges["price"] }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const previousValuesRef = useRef<[number, number] | undefined>(undefined);

//   const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
//     const minPrice = searchParams.get("min_price");
//     const maxPrice = searchParams.get("max_price");

//     return [
//       minPrice ? parseInt(minPrice) : priceRange.min,
//       maxPrice ? parseInt(maxPrice) : priceRange.max, // This is correct - initial max value
//     ];
//   });

//   const handleChange = (newValues: [number, number]): void => {
//     setSliderValues(newValues);
//   };

//   // Debounced URL update
//   useEffect(() => {
//     const updateURL = (newValues: [number, number]) => {
//       const params = new URLSearchParams(searchParams.toString());

//       // Only set params if they're different from defaults
//       if (newValues[0] !== priceRange.min) {
//         params.set("min_price", newValues[0].toString());
//       } else {
//         params.delete("min_price");
//       }

//       // FIXED: Compare against the initial default value, not priceRange.max
//       if (newValues[1] !== priceRange.max) {
//         params.set("max_price", newValues[1].toString());
//       } else {
//         params.delete("max_price");
//       }

//       // Only reset to first page when price VALUES actually change
//       const previousValues = previousValuesRef.current;
//       const valuesChanged =
//         !previousValues ||
//         previousValues[0] !== newValues[0] ||
//         previousValues[1] !== newValues[1];

//       if (valuesChanged && previousValues) {
//         params.delete("page");
//       }

//       // Update the ref with current values
//       previousValuesRef.current = newValues;

//       router.push(`?${params.toString()}`, { scroll: false });
//     };

//     const timeoutId = setTimeout(() => {
//       updateURL(sliderValues);
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [sliderValues, searchParams, router, priceRange.min]);

//   // Sync with URL params when they change externally
//   useEffect(() => {
//     const minPrice = searchParams.get("min_price");
//     const maxPrice = searchParams.get("max_price");

//     const newValues: [number, number] = [
//       minPrice ? parseInt(minPrice) : priceRange.min,
//       maxPrice ? parseInt(maxPrice) : priceRange.max // FIXED: Use initial default value
//     ];

//     // Only update state if values actually changed
//     if (newValues[0] !== sliderValues[0] || newValues[1] !== sliderValues[1]) {
//       setSliderValues(newValues);
//     }
//   }, [searchParams, priceRange.min]); // Added priceRange.min to dependencies

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <RangeSlider
//         defaultValue={sliderValues}
//         valueLabelDisplay="on"
//         label="Price Range"
//         onChange={handleChange}
//         min={priceRange.min}
//         max={priceRange.max} // This is correct - the slider can go up to priceRange.max
//         step={PRICE_SLIDER_STEP}
//         currency={CURRENCY}
//       />
//     </div>
//   );
// }