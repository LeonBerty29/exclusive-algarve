"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RangeSelectProps {
  options: number[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  reversed?: boolean;
}

// Base RangeSelect component
export function RangeSelect({
  options,
  value,
  onChange,
  label,
  placeholder = "Select",
  reversed = false,
}: RangeSelectProps) {
  const displayOptions = reversed ? [...options].reverse() : options;

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {displayOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function MinRangeSelect({
  options,
  value,
  onChange,
  label = "Min",
}: Omit<RangeSelectProps, "reversed" | "placeholder">) {
  return (
    <RangeSelect
      options={options}
      value={value}
      onChange={onChange}
      label={label}
      placeholder="Select"
    />
  );
}

export function MaxRangeSelect({
  options,
  value,
  onChange,
  label = "Max",
}: Omit<RangeSelectProps, "reversed" | "placeholder">) {
  return (
    <RangeSelect
      options={options}
      value={value}
      onChange={onChange}
      label={label}
      placeholder="Select"
      reversed={true}
    />
  );
}
