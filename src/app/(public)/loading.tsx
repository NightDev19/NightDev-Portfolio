import { LoadingSpinner } from '@/components/ui/loader'

export default function PublicLoading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <LoadingSpinner size="lg" />
    </div>
  )
}
