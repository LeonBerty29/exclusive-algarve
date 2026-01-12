import { PropertyTypes } from "./property-types";
import { BedroomsDropdown } from "./bedroom-select";
import { PriceSelect } from "./price-select";
import RegionSelect from "./region-select";
import { BathroomsDropdown } from "./bathroom-select";
import { LocationArea } from "@/types/property";

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

export async function ListPropertyTypesDesktop({ typologies }: { typologies: Typology[] }) {
 return <PropertyTypes typologies={typologies} modal={false} />;
}

export async function ListBedroomsRangeSelectDesktop({ bedroomsRange }: { bedroomsRange: BedroomsRange }) {
  return <BedroomsDropdown bedroomsRange={bedroomsRange} modal={false} />;
}

export async function ListPricesDesktop({ priceRange }: { priceRange: PriceRange }) {
  return <PriceSelect modal={false} priceRange={priceRange} />;
}

export async function ListRegionSelectDesktop({ areas }: { areas: LocationArea[] }) {
  return <RegionSelect areas={areas} modal={false} />;
}

export async function ListBathroomsRangeSelectDesktop({ bathroomsRange }: { bathroomsRange: BathroomsRange }) {
  
  return <BathroomsDropdown bathroomsRange={bathroomsRange} modal={false} />;
}
