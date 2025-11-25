import Link from "next/link";
import { cn, sectionBase, bodyText, flexWrap, linkBase, textMuted, gap, textBase, marginTopLarge } from "@/lib/classNames";

export function ContactSection() {
  return (
    <section className={cn(sectionBase, marginTopLarge)}>
      <p className={bodyText}>
        Whether it&apos;s about my work, possible collaborations, or any
        design/art/tech links you might want to share, I&apos;d love to hear from you
        (ʚ •ᴗ• ɞ)
      </p>
      <div className={cn(flexWrap, gap.sm, textBase)}>
        <Link
          href="mailto:cyn.cui@icloud.com"
          className={linkBase}
        >
          cyn.cui@icloud.com
        </Link>
        <span className={textMuted}>⊹</span>
        <Link href="https://www.linkedin.com/in/tsuai" className={linkBase} target="_blank" rel="noopener noreferrer">
          Linkedin
        </Link>
        <span className={textMuted}>⊹</span>
        <Link href="https://github.com/cyncui" className={linkBase} target="_blank" rel="noopener noreferrer">
          Github
        </Link>
        <span className={textMuted}>⊹</span>
        <Link href="https://www.are.na/cynthia" className={linkBase} target="_blank" rel="noopener noreferrer">
          Are.na
        </Link>
      </div>
    </section>
  );
}

