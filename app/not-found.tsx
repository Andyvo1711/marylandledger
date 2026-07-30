import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-28 text-left">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">404</span>
      <h1 className="mt-3 font-headline text-4xl text-text-primary md:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Return Home
      </Link>
    </div>
  );
}
