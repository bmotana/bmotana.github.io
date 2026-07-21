export default function LoadingScreen({ isFadingOut = false }) {
  return (
    <div
      className={[
        'fixed inset-0 z-9999 grid place-items-center text-zinc-50',
        'bg-linear-to-br from-violet-950 via-fuchsia-950 to-indigo-950',
        'transition-opacity duration-500 ease-out motion-reduce:transition-none',
        isFadingOut ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
      aria-label="Loading"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative grid place-items-center">
          <div className="h-16 w-16 rounded-full border-4 border-white/15 border-t-fuchsia-300 animate-spin motion-reduce:animate-none" />
          <div className="absolute grid place-items-center">
            <span
              className="text-2xl font-extrabold leading-none text-fuchsia-100 drop-shadow-sm animate-pulse [animation-duration:900ms] motion-reduce:animate-none"
              aria-hidden="true"
            >
              B
            </span>
          </div>
        </div>
        <p className="text-sm tracking-widest text-white/70 uppercase">Loading</p>
      </div>
    </div>
  )
}

