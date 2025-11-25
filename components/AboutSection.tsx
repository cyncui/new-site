import { bodyText, textGray } from "@/lib/classNames";
import { cn } from "@/lib/classNames";

export function AboutSection() {
  return (
    <section>
      <p className={cn(bodyText, textGray)}>
        My work in goal-driven interactions and systems is rooted in HCI, and
        empathy. I create experiences that align user needs with strategic
        goals. I&apos;ve also designed experiences in academia, SaaS, and
        community-building ₊⊹
      </p>
    </section>
  );
}
