export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-c-bg-tertiary rounded ${className}`} />
  )
}

export const TokenCardSkeleton = () => {
  return (
    <div className="p-4 bg-c-bg-secondary rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-12 h-4 ml-auto" />
          <Skeleton className="w-16 h-3 ml-auto" />
        </div>
      </div>
    </div>
  )
}