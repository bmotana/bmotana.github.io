const email = 'bmotana1@gmail.com'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-24 pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-indigo-300/25 bg-zinc-900/75 px-6 py-12 text-center shadow-[0_18px_60px_rgba(49,46,129,0.18)] sm:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />
        <p className="relative mb-3 text-sm font-medium tracking-widest text-indigo-300 uppercase">
          Let’s work together
        </p>
        <h2 className="relative text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl leading-7 text-zinc-300">
          I’m always open to discussing thoughtful web experiences, useful tools, and new opportunities.
        </p>
        <a
          href={`mailto:${email}`}
          className="relative mt-7 inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Email me at {email}
        </a>
      </div>
    </section>
  )
}
