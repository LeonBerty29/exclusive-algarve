'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hovering, setHovering] = useState<string>('');

    // Get initial selected regions from URL
    const getInitialRegions = (): string[] => {
        const locations = searchParams.get('location');
        return locations ? locations.split(',') : [];
    };

    const [selectedItems, setSelectedItems] = useState<string[]>(getInitialRegions);

    // Update URL when selections change
    const updateURL = (newSelections: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (newSelections.length > 0) {
            params.set('location', newSelections.join(','));
        } else {
            params.delete('location');
        }
        
        // Reset to first page when region changes
        params.delete('page');
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleItemSelect = (item: string): void => {
        const newSelections = selectedItems.includes(item)
            ? selectedItems.filter(i => i !== item)
            : [...selectedItems, item];
            
        setSelectedItems(newSelections);
        updateURL(newSelections);
    };

    // Sync with URL params when they change externally
    useEffect(() => {
        setSelectedItems(getInitialRegions());
    }, [searchParams]);

    const regions = ['Central Algarve', 'West Algarve', 'East Algarve', 'Almancil', 'Alvor', 'Faro', 'Lagoa'];

    return (
        <div className="w-full bg-white">
            <Command className="border-none [&_[cmdk-input-wrapper]]:bg-gray-100 [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:rounded-none rounded-none">
                <CommandInput
                    className="border-none bg-gray-100 rounded-none"
                    inputContainerColor="bg-gray-100"
                    placeholder="Search regions..."
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
                                    region === hovering && "hover:bg-slate-50", 
                                    selectedItems.includes(region) && "font-bold text-primary hover:text-primary [&_[cmdk-item][data-selected]]:text-primary", 
                                    region === hovering && selectedItems.includes(region) && "text-primary"
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