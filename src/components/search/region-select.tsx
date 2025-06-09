'use client'
import { useState } from 'react';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
} from '@/components/ui/command';
import { CommandItem } from '@/components/ui/command-two';
import { Check } from "lucide-react";
import { cn } from '@/lib/utils';


export default function RegionSelect() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [hovering, setHovering] = useState<string>('');


    const handleItemSelect = (item: string): void => {
        console.log(`Selected item: ${item}`);
        setSelectedItems(prev => {
            if (prev.includes(item)) {
                return prev.filter(i => i !== item);
            } else {
                return [...prev, item];
            }
        });
    };






    const regions = ['Central Algarve', 'West Algarve', 'East Algarve', 'Almancil', 'Alvor', 'Faro', 'Lagoa'];


    return (
        <div className="w-full  bg-white">


            <Command className="border-none [&_[cmdk-input-wrapper]]:bg-gray-100 [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:rounded-none rounded-none">
                <CommandInput
                    className="border-none bg-gray-100 rounded-none"
                    inputContainerColor="bg-gray-100"
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className={cn(
                        !hovering && "[&_[cmdk-item][data-selected]]:bg-transparent"
                    )}>
                        {regions.map((region, index) => (
                            <CommandItem
                                key={`${region}--${index}`}
                                onSelect={() => handleItemSelect(region)}
                                className={cn(
                                    "flex items-center justify-between hover:bg-red-200",
                                    region === hovering && "hover:bg-slate-50", selectedItems.includes(region) && "font-bold text-primary hover:text-primary [&_[cmdk-item][data-selected]]:text-primary", region === hovering && selectedItems.includes(region) && "text-primary"
                                )}
                                onMouseEnter={() => { setHovering(region) }}
                                onMouseLeave={() => { setHovering('') }}
                            >
                                {region}
                                {selectedItems.includes(region) && (
                                    <Check className="h-4 w-4 text-primary" strokeWidth={4} />
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}

