import {
  sectionBase,
  sectionSpacingSmall,
  headingLarge,
  textBase,
  fontNormal,
  cn,
  textBlack,
} from "@/lib/classNames";

export function HeaderSection() {
  return (
    <section className={sectionBase}>
      <div className={sectionSpacingSmall}>
        <h1 className={cn(headingLarge, textBlack)}>
          <span className={fontNormal}>Cynthia Cui</span>
        </h1>
        <p className={textBase}>
          <span className={fontNormal}>
            Design Director @ Asian-Indigenous Relations Collective
          </span>{" "}
        </p>
      </div>
    </section>
  );
}
