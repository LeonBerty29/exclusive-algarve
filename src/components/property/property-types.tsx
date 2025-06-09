"use client"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox-two"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"


interface ItemsType {
    id: string,
    label: string,
    total: number
}


const items: ItemsType[] = [
    {
        id: "mv-1",
        label: "Modern Villas",
        total: 30
    },
    {
        id: "vil-2",
        label: "Villa",
        total: 4
    },
    {
        id: "tw-3",
        label: "Townhouse",
        total: 100
    },
    {
        id: "aprt-4",
        label: "Apartment",
        total: 10
    },
    {
        id: "plt-5",
        label: "Plot",
        total: 26


    },
]


export function PropertyTypes() {
    const [selectedItems, setSelectedItems] = useState<string[]>([])


    const handleCheckboxChange = (itemId: string, checked: boolean | string) => {
        if (checked) {
            setSelectedItems(prev => [...prev, itemId])
        } else {
            setSelectedItems(prev => prev.filter(id => id !== itemId))
        }
    }


    // const handleSubmit = () => {
    //     console.log("Form submitted with selections:", selectedItems)
    //     alert(`Selected items: ${selectedItems.join(", ")}`)
    // }


    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id={item.id}
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                            className={cn(
                                "rounded-[3px] data-[state=checked]:!bg-primary data-[state=checked]:!border-primary bg-gray-400/70 border-gray-400/70",
                                selectedItems.includes(item.id) && "font-bold bg-primary"
                            )}
                            alwaysShowCheck={true}
                            checkIconColor="white"
                        />
                        <Label htmlFor={item.id} className={cn(
                            "text-sm font-normal text-neutral-500",
                            selectedItems.includes(item.id) && "font-bold text-primary"
                        )}>
                            {item.label}
                        </Label>
                    </div>
                    <span className="text-sm font-bold">
                        {item.total}
                    </span>
                </div>
            ))}
        </div>
    )
}