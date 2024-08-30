'use client' // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
  title
}: {
  error?: Error & { digest?: string }
  reset?: () => void
  title: string
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body
        className={
          'text-1xl sm:text-3xl bg-black text-white flex items-center justify-center text-center w-screen h-screen'
        }
      >
        <h2>{title}!</h2>
        {/* <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  )
}
