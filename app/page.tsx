
import Link from "next/link";

const demos = [
  {
    href: "/email-password",
    title: "Email + Password",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#393432]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-wider">
            Authentication
          </p>

          <h1 className="text-4xl font-semibold">
            Welcome
          </h1>

          <p className="text-base text-[#77706C]">
            Sign in or create an account to get started.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
    
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="flex flex-col rounded-2xl bg-rose-100 transition hover:-translate-y-1 hover:border-[#D98D82]"
            >
              <h3 className="mt-4 text-xl font-semibold">
                {demo.title}
              </h3>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}
