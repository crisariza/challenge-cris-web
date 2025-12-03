import { Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="min-h-screen bg-daybg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-paisabank-default animate-spin" />
      </div>
    </div>
  )
}
