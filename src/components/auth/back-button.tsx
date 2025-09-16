"use client"

import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button"

interface BackButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  href: string | any;
  label: string
}

export const BackButton = ({
  href,
  label
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}