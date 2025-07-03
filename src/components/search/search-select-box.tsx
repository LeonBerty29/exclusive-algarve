"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export const SearchSelectBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)
  
  // Get current search value from URL params
  const currentSearch = searchParams.get('search') || ""
  const [value, setValue] = React.useState(currentSearch)

  // Update URL when value changes
  const updateURL = React.useCallback((newValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newValue) {
      params.set('search', newValue)
    } else {
      params.delete('search')
    }
    
    // Reset to first page when search changes
    params.delete('page')
    
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    updateURL(newValue)
    setOpen(false)
  }

  // Sync with URL params when they change
  React.useEffect(() => {
    setValue(currentSearch)
  }, [currentSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-transparent border-b-mainYellowColor bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent rounded-none px-0 text-neutral-500 font-light text-sm"
        >
          {value
            ? <span className="text-sm text-black">{frameworks.find((framework) => framework.value === value)?.label || value}</span>
            : <span className="text-sm">Search...</span>}
          <ChevronDown className="opacity-50 text-mainYellowColor" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search and select" 
            className="h-9"
            onValueChange={(searchValue) => {
              // Allow free text search
              setValue(searchValue)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateURL(value)
                setOpen(false)
              }
            }}
          />
          <CommandList>
            <CommandEmpty>
              <div className="p-2">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    updateURL(value)
                    setOpen(false)
                  }}
                  size="sm"
                >
                  Search for &quot;{value}&quot;
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleSelect}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}