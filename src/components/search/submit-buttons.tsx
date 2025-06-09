"use client"
import { Button } from "@/components/ui/button"
import { Heart, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"


export function AddToFavoriteButton() {
    const { pending } = useFormStatus()


    return (
        <>
            {
                pending ? (
                    <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </Button>
                ) : (
                    <Button variant="default" className="bg-white p-2 h-6 w-6 rounded-full hover:bg-gray-200">
                        <Heart className="!w-[14px] !h-[14px] text-black" />
                    </Button>
                )
            }
        </>
    )
}




export function DeleteFromFavoriteButton() {
    const { pending } = useFormStatus()


    return (
        <>
            {
                pending ? (
                    <Button variant="outline" disabled className="bg-primary-foreground p-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </Button>
                ) : (
                    <Button variant="default" className="bg-white p-2 h-6 w-6 rounded-full hover:bg-gray-200">
                        <Heart className="!w-[14px] !h-[14px] text-[#E21C49]" fill="#E21C49" strokeWidth={1} />
                    </Button>
                )
            }
        </>
    )
}

