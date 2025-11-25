import { DecorativeSeparator } from "@/components/DecorativeSeparator";
import { cn, sectionSpacingSmall, paddingTop, flexRowCenter } from "@/lib/classNames";

export function FooterSeparators() {
  return (
    <div className={cn(sectionSpacingSmall, paddingTop, flexRowCenter)}>
      <DecorativeSeparator />
      <DecorativeSeparator />
    </div>
  );
}

