import { getMetadata, getRanges } from "@/data/properties-metada";
import { BedroomsDropdownDesktop } from "./bedroom-select-desktop";
import RegionSelectDesktop from "./region-select-desktop";
import { BathroomsDropdownDesktop } from "./bathroom-select-desktop";
import { PropertyTypesDesktop } from "./property-types-desktop";
import { PriceSelectDesktop } from "./price-select-desktop";

export async function ListPropertyTypesDesktop() {
  // const language = "";
  const metadata = await getMetadata();
  const typologies = metadata.typologies;
  return <PropertyTypesDesktop typologies={typologies} />;
}

export async function ListBedroomsRangeSelectDesktop() {
  const ranges = await getRanges();
  const bedroomRange = ranges.bedrooms; // Fixed: was using ranges.price
  // return <BedroomsRangeSelect bedroomRange={bedroomRange} />;
  return <BedroomsDropdownDesktop bedroomRange={bedroomRange} />;
}

export async function ListPricesDesktop() {
  const ranges = await getRanges();
  const priceRange = ranges.price;
  return <PriceSelectDesktop priceRange={priceRange} />;
}

export async function ListRegionSelectDesktop() {
  const metadata = await getMetadata();
  return <RegionSelectDesktop metadata={metadata} />;
}

export async function ListBathroomsRangeSelectDesktop() {
  const ranges = await getRanges();
  const bathroomRange = ranges.bathrooms;
  // return <BathroomsRangeSelect bathroomRange={bathroomRange} />;
  return <BathroomsDropdownDesktop bathroomRange={bathroomRange} />;
}
