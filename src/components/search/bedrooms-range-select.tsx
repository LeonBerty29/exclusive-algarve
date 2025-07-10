import { DualRangeSelect } from "./dual-range-select";

export function BedroomsRangeSelect({ 
    bedroomRange 
}: { 
    bedroomRange: { min: number; max: number } 
}) {
    return (
        <DualRangeSelect
            range={bedroomRange}
            minParamName="min_bedrooms"
            maxParamName="max_bedrooms"
            minLabel="Min"
            maxLabel="Max"
        />
    );
}