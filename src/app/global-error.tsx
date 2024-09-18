'use client' // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const reload = () => {
    window.location?.reload()
  }
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reload()}>Try again</button>
      </body>
    </html>
  )
}
