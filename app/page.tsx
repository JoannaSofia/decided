
import Link from "next/link";

const demos = [
  {
    href: "/email-password",
    title: "Sign in or register if you have an accound already",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F6F6] text-[#393432]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">

        <header className="space-y-4">
          <h1 className="text-4xl font-semibold">
            Welcome
          </h1>

          <p className="text-base text-[#77706C]">
            This is the decided app, which helps you to plan and decide ahead of time, which will save you time and headache.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
    
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="flex flex-col bg-rose-100 transition hover:-translate-y-1 hover:border-[#D98D82]"
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
