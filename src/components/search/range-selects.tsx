"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JSX } from "react";

interface RangeSelectProps {
  displayOptions: JSX.Element[];
  options: number[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  reversed?: boolean;
  minValue?: number;
  maxValue?: number;
}

// Base RangeSelect component
export function RangeSelect({
  displayOptions,
  value,
  onChange,
  label,
  placeholder = "Select",
}: Omit<RangeSelectProps, "options">) {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{displayOptions}</SelectContent>
      </Select>
    </div>
  );
}

export function MinRangeSelect({
  options,
  value,
  onChange,
  maxValue,
  label = "Min",
}: Omit<RangeSelectProps, "displayOptions" | "placeholder">) {
  const displayOptions = options.map((option) => {
    if (maxValue && option > maxValue) {
      return (
        <SelectItem key={option} value={option.toString()} disabled>
          {option}
        </SelectItem>
      );
    }
    return (
      <SelectItem key={option} value={option.toString()}>
        {option}
      </SelectItem>
    );
  });
  return (
    <RangeSelect
      displayOptions={displayOptions}
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
  minValue,
  onChange,
  label = "Max",
}: Omit<RangeSelectProps, "displayOptions" | "placeholder">) {
  const displayOptions = [...options].reverse().map((option) => {
    if (minValue && option < minValue) {
      return (
        <SelectItem key={option} value={option.toString()} disabled>
          {option}
        </SelectItem>
      );
    }
    return (
      <SelectItem key={option} value={option.toString()}>
        {option}
      </SelectItem>
    );
  });
  return (
    <RangeSelect
      displayOptions={displayOptions}
      value={value}
      onChange={onChange}
      label={label}
      placeholder="Select"
      reversed={true}
    />
  );
}
