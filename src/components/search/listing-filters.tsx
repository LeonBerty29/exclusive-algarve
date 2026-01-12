import { BathroomsDropdown } from "./bathroom-select";
import RegionSelect from "./region-select";
import { BedroomsDropdown } from "./bedroom-select";
import { PriceSelect } from "./price-select";
import { PropertyTypes } from "./property-types";
import { LocationArea } from "@/types/property";

// export async function ListPropertyTypes() {
//   // const language = "";
//   const metadata = await getMetadata();
//   const typologies = metadata.typologies;
//   return <PropertyTypes typologies={typologies} />;
// }

// export async function ListPrices() {
//   const ranges = await getRanges();
//   const priceRange = ranges.price;
//   return <PriceSelect priceRange={priceRange} />;
// }

// // async function ListAreaSlider() {
// //   const ranges = await getRanges();
// //   const areaRange = ranges.private_area;
// //   return <AreaSlider areaRange={areaRange} />;
// // }

// export async function ListBedroomsRangeSelect() {
//   // const ranges = await getRanges();
//   // const bedroomRange = ranges.bedrooms; // Fixed: was using ranges.price
//   // return <BedroomsRangeSelect bedroomRange={bedroomRange} />;
//   return <BedroomsDropdown 
//   // bedroomRange={bedroomRange} 
//   />;
// }

// export async function ListRegionSelect() {
//   const metadata = await getMetadata();
//   return <RegionSelect metadata={metadata} />;
// }

// export async function ListBathroomsRangeSelect() {
//   // const ranges = await getRanges();
//   // const bathroomRange = ranges.bathrooms;
//   // return <BathroomsRangeSelect bathroomRange={bathroomRange} />;
//   return (
//     <BathroomsDropdown
//     // bathroomRange={bathroomRange}
//     />
//   );
// }


interface Typology {
  id: number;
  name: string;
}

interface PriceRange {
  min: number;
  max: number;
  ranges?: Array<{
    min: number;
    max: number | null;
    count: number;
  }>;
}

interface BedroomsRange {
  min: number;
  max: number;
}

interface BathroomsRange {
  min: number;
  max: number;
}

export function ListRegionSelect({ areas }: { areas: LocationArea[] }) {
  return <RegionSelect areas={areas} modal={false} />;
}

export function ListPropertyTypes({ typologies }: { typologies: Typology[] }) {
  return <PropertyTypes typologies={typologies} modal={false} />;
}

export function ListPrices({ priceRange }: { priceRange: PriceRange }) {
  return <PriceSelect priceRange={priceRange} modal={false} />;
}

export function ListBedroomsRangeSelect({ bedroomsRange }: { bedroomsRange: BedroomsRange }) {
  return <BedroomsDropdown bedroomsRange={bedroomsRange} modal={false} />;
}

export function ListBathroomsRangeSelect({ bathroomsRange }: { bathroomsRange: BathroomsRange }) {
  return <BathroomsDropdown bathroomsRange={bathroomsRange} modal={false} />;
}