import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Η σελίδα δεν βρέθηκε
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Επιστρέψτε στην αρχική ή επικοινωνήστε μαζί μας για οποιαδήποτε ανάγκη.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" className="gap-2 rounded-full font-mono text-[11px] uppercase tracking-[0.12em]">
          Αρχική
          <ArrowUpRight className="h-3.5 w-3.5" />
        </ButtonLink>
        <Link
          href={siteConfig.phoneHref}
          className="inline-flex h-9 items-center rounded-full border border-border/60 px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-foreground/[0.04]"
        >
          {siteConfig.phone}
        </Link>
      </div>
    </main>
  );
}
