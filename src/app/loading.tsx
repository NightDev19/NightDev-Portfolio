import { LoadingSpinner } from '@/components/ui/loader'

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  )
}
