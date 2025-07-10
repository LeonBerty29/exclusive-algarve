import { DualRangeSelect } from "./dual-range-select";

export function BathroomsRangeSelect({ 
    bathroomRange 
}: { 
    bathroomRange: { min: number; max: number } 
}) {
    return (
        <DualRangeSelect
            range={bathroomRange}
            minParamName="min_bathrooms"
            maxParamName="max_bathrooms"
            minLabel="Min"
            maxLabel="Max"
        />
    );
}