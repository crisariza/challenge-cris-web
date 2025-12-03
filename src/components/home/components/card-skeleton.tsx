"use client"

export function CardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="relative rounded-3xl shadow-md overflow-hidden shrink-0 w-[90%] snap-start bg-gray-200 px-6 py-4"
      style={{
        minHeight: index === 0 ? "auto" : "170px",
      }}
    >
      <div
        className={`relative z-10 ${index !== 0 ? "flex items-center justify-between" : ""}`}
      >
        {index === 0 ? (
          <>
            {/* Main card  */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {/* Balance  */}
                <div className="h-4 w-16 bg-gray-300 rounded mb-2" />

                {/* Currency badge and balance */}
                <div className="flex items-center gap-2">
                  <div className="h-6 w-12 bg-gray-300 rounded-lg" />
                  <div className="h-8 w-32 bg-gray-300 rounded" />
                </div>
              </div>

              {/* Logo placeholder */}
              <div className="w-8 h-6 bg-gray-300 rounded" />
            </div>

            <div className="mt-6">
              {/* Card number */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-12 bg-gray-300 rounded" />
                <div className="h-4 w-12 bg-gray-300 rounded" />
                <div className="h-4 w-12 bg-gray-300 rounded" />
                <div className="h-5 w-20 bg-gray-300 rounded" />
              </div>

              {/* Card name and expiration */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-40 bg-gray-300 rounded" />
                <div className="text-right">
                  <div className="h-3 w-16 bg-gray-300 rounded mb-1" />
                  <div className="h-4 w-12 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Side card skeleton */}
            <div className="w-32 bg-gray-300 rounded" />
            <div className="w-6 bg-gray-300 rounded" />
          </>
        )}
      </div>
    </div>
  )
}
