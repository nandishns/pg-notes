import { useEffect, useState } from "react";
import { BookOpen, Download, GraduationCap } from "lucide-react";
import { Quote as QuoteType, getRandomQuote } from "@/lib/quotes";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote = ({ text, author }: QuoteProps) => (
  <figure className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] sm:p-8">
    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary opacity-70" />
    <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/5 blur-2xl" aria-hidden="true" />

    <span
      aria-hidden="true"
      className="font-display text-6xl leading-none text-primary/15 sm:text-7xl"
    >
      &ldquo;
    </span>
    <blockquote className="-mt-6 sm:-mt-8">
      <p className="font-display text-lg italic leading-relaxed text-foreground sm:text-xl">
        {text}
      </p>
    </blockquote>
    <figcaption className="mt-4 flex items-center justify-end gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-8 bg-border" />
      {author}
    </figcaption>
  </figure>
);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="group rounded-xl border border-border/60 bg-background/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-sm sm:p-5">
    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
      {icon}
    </div>
    <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
);

export function WelcomeSection() {
  const [quote, setQuote] = useState<QuoteType>({
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
  });

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 text-center shadow-[0_8px_24px_-12px_rgba(15,23,42,0.10)] sm:p-10">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          PG Notes Portal
        </span>

        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          Welcome
          <span role="img" aria-label="welcome" className="animate-wave ml-2 inline-block">
            👋
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Pick a semester and subject above to explore unit-wise notes, previous year papers, and
          curated study material, all in one place.
        </p>

        <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3 text-left sm:mt-8 sm:grid-cols-2 sm:gap-4">
          <FeatureCard
            title="Unit-wise Notes"
            description="Step-by-step lessons organised for clarity."
            icon={<BookOpen className="h-4 w-4" />}
          />
          <FeatureCard
            title="View or Download"
            description="Read online or save offline anytime."
            icon={<Download className="h-4 w-4" />}
          />
        </div>

        <div className="mx-auto mt-6 flex max-w-xl items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-left sm:mt-8">
          <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            New here? Try selecting <span className="font-medium text-foreground">Semester 1</span>{" "}
            and pick any subject to begin.
          </p>
        </div>
      </section>

      <Quote text={quote.text} author={quote.author} />
    </div>
  );
}
