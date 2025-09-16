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
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Property } from "@/types/property";
import { LanguageSwitcher } from "./language-switcher";

export const PropertiesLanguageSwitcherDropdown = ({
  slugs,
}: {
  slugs: Property["seo"]["slugs"];
}) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isPropertyPage = pathname.includes("/properties/");

  if (!isPropertyPage) {
    return <LanguageSwitcher />;
  }
  const languages = routing.locales;

  const handleLanguageChange = (lang: string) => {
    if (lang !== locale) {
      const path = slugs[lang as keyof typeof slugs];
      const targetPath = {
        pathname: "/properties/[slug]" as const,
        params: { slug: path },
      };

      router.refresh();
      router.replace(targetPath, { locale: lang });
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
