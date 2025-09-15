"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Property } from "@/types/property";

export const PropertiesLanguageSwitcherDropdown = ({
  slugs,
}: {
  slugs: Property["seo"]["slugs"];
}) => {
  const locale = useLocale();
  // const pathname = usePathname();
  const router = useRouter();
  const languages = routing.locales;

  console.log({ slugs });

  const handleLanguageChange = (lang: string) => {
    if (lang !== locale) {
      alert(lang)

      const path = slugs[lang as keyof typeof slugs];
      router.replace(`${path}`, { locale: lang,});
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm">{locale}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-20">
          {/* <DropdownMenuItem className="cursor-pointer">
            <span className="text-sm">ENG</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <span className="text-sm">FRE</span>
          </DropdownMenuItem> */}
          {languages.map((lang, index) => (
            <DropdownMenuItem
              key={`${lang}-${index}`}
              className={cn(
                "cursor-pointer",
                lang === locale && "text-primary"
              )}
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="text-base">{lang}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
