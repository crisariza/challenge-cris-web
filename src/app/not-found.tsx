import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md">
        {/* 404 Icon */}
        <div className="w-[47px] h-[59px] flex items-center justify-center mb-4">
          <Image
            src="/icons/404.svg"
            alt="404 icon"
            width={47}
            height={59}
            className="w-full h-full"
          />
        </div>

        {/* Page Not Found Heading */}
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground">
          Página no encontrada
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-muted-foreground max-w-sm">
          La página que estás buscando no existe o ha sido movida.
        </p>

        {/* Go Home Button */}
        <Link href="/" className="w-full">
          <Button
            className="bg-paisabank-default font-medium w-full rounded-full border cursor-pointer"
            size="default"
          >
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
