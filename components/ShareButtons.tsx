"use client";

import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-text-secondary">
        Share
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <Facebook size={15} aria-hidden="true" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <Twitter size={15} aria-hidden="true" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <Linkedin size={15} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <Link2 size={15} aria-hidden="true" />
      </button>
      {copied ? <span className="text-xs text-accent">Copied</span> : null}
    </div>
  );
}
