import Link from "next/link";
import HeroStack from "@/components/HeroStack";
import ProcessSteps from "@/components/ProcessSteps";
import AboutDavid from "@/components/AboutDavid";
import QuoteForm from "@/components/QuoteForm";

/*
  The homepage now leads with the whole practice rather than website
  development alone, a deliberate departure from brief §2, agreed with David.

  Consequences of that decision, so they aren't mistaken for omissions:
    • The old "Already have a site? I also help with:" strip is gone. The
      stack in the hero already offers all four services, so the strip was
      repeating itself and contradicting the hero's framing.
    • The hero's second link ("See how a project works") is gone too: it
      pointed at website development specifically, which re-narrowed the page
      right after the stack had widened it.
*/
export default function Home() {
  return (
    <main id="main">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h1 className="max-w-[18ch] text-3xl sm:text-4xl lg:text-5xl">
              One person for your whole tech stack.
            </h1>

            <p className="mt-7 max-w-[54ch] text-lg">
              The website people find you through, the email that makes you look
              professional, the dashboards that tell you what&rsquo;s happening,
              and the systems underneath. Built and looked after by someone who
              understands how they connect.
            </p>

            <div className="mt-10">
              <Link
                href="#quote"
                className="inline-block bg-accent px-7 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-hover focus-visible:outline-[#161b22]"
              >
                Get a quote
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <HeroStack />
          </div>
        </div>
      </section>

      <ProcessSteps />

      <AboutDavid />

      <QuoteForm />
    </main>
  );
}
