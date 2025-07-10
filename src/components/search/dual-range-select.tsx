"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MaxRangeSelect, MinRangeSelect } from "./range-selects";

interface DualRangeSelectProps {
  range: { min: number; max: number };
  minParamName: string;
  maxParamName: string;
  minLabel?: string;
  maxLabel?: string;
}

export function DualRangeSelect({
  range,
  minParamName,
  maxParamName,
  minLabel = "Min",
  maxLabel = "Max",
}: DualRangeSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generate options from min to max
  const options = Array.from(
    { length: range.max - range.min + 1 },
    (_, i) => range.min + i
  );

  // Get current values from URL
  const minValue = searchParams.get(minParamName) || "";
  const maxValue = searchParams.get(maxParamName) || "";

  const updateURL = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    // Reset to first page when filters change
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleMinChange = (value: string) => {
    updateURL(minParamName, value);
  };

  const handleMaxChange = (value: string) => {
    updateURL(maxParamName, value);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <MinRangeSelect
          options={options}
          value={minValue}
          onChange={handleMinChange}
          label={minLabel}
        />
      </div>
      <div className="flex-1">
        <MaxRangeSelect
          options={options}
          value={maxValue}
          onChange={handleMaxChange}
          label={maxLabel}
        />
      </div>
    </div>
  );
}
