import React from 'react'
import { Button } from '../ui/button'
import { Bed, Landmark, MapPin, X } from 'lucide-react'
import { IoMdPricetag } from 'react-icons/io'
import { getCurrencySymbol } from '../shared/price-format'

const FilterTags = () => {
    return (
        <>
            <p className="text-sm mr-8">Found <span className="text-primary font-bold">740</span> Properties</p>

            <div className="text-sm bg-gray-200 font-semibold text-black flex items-center gap-2 px-4 py-2">
                <span className="text-gray-700">
                    {
                        getCurrencySymbol("EUR")
                    }
                </span>
                <span>50K</span> - <span>100k</span>

                <Button asChild size="icon" variant="ghost" className="text-gray-600 font-semibold hover:bg-inherit cursor-pointer">
                    <X className="h-4 w-4 text-gray-600" strokeWidth={3} />
                </Button>
            </div>


            <div className="text-sm bg-gray-200 font-semibold text-black flex items-center gap-2 px-4 py-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>Lagos</span>

                <Button asChild size="icon" variant="ghost" className="text-gray-600 font-semibold hover:bg-inherit cursor-pointer">
                    <X className="h-4 w-4 text-gray-600" strokeWidth={3} />
                </Button>
            </div>


            <div className="text-sm bg-gray-200 font-semibold text-black flex items-center gap-2 px-4 py-2">
                <Landmark className="h-4 w-4 text-gray-600" />
                <span>Villa</span>

                <Button asChild size="icon" variant="ghost" className="text-gray-600 font-semibold hover:bg-inherit cursor-pointer">
                    <X className="h-4 w-4 text-gray-600" strokeWidth={3} />
                </Button>
            </div>

            <div className="text-sm bg-gray-200 font-semibold text-black flex items-center gap-2 px-4 py-2">
                <Bed className="h-4 w-4 text-gray-600 " />
                {5} Beds

                <Button asChild size="icon" variant="ghost" className="text-gray-600 font-semibold hover:bg-inherit cursor-pointer">
                    <X className="h-4 w-4 text-gray-600 " strokeWidth={3} />
                </Button>
            </div>

            <div className="text-sm bg-gray-200 font-semibold text-black flex items-center gap-2 px-4 py-2">
                <IoMdPricetag className="h-4 w-4" fill='none' strokeWidth={20} />
                EAV-000

                <Button asChild size="icon" variant="ghost" className="text-gray-600 font-semibold hover:bg-inherit cursor-pointer">
                    <X className="h-4 w-4 text-gray-600 " strokeWidth={3} />
                </Button>
            </div>

            <Button className="text-red-600 font-semibold" variant={"ghost"}>
                <X className="h-4 w-4" strokeWidth={3} /> Clear all
            </Button>
        </>
    )
}

export default FilterTags