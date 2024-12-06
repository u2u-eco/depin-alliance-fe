'use client' // Error boundaries must be Client Components

export default function DeviceError({
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
          'text-base font-semibold bg-black text-white  flex items-center justify-center flex-col text-center w-screen h-screen space-y-3'
        }
      >
        <p className="text-lg">Play on your mobile</p>
        <img
          className="size-[200px] 2xs:size-[240px] mx-auto rounded-lg"
          src="/assets/images/depin-qr-code.png"
          alt="DePIN Alliance"
        />
        <h2>{title}</h2>
        {/* <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  )
}
