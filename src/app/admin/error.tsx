'use client'

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-md">{error.message || 'An unexpected error occurred.'}</p>
      <button
        type="button"
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
