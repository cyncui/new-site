"use client";

import { buttonBase, cn } from "@/lib/classNames";
import { motion } from "framer-motion";

interface WelcomeSectionProps {
  onNavigateToWork: () => void;
}

export default function WelcomeSection({ onNavigateToWork }: WelcomeSectionProps) {

  return (
    <section 
      className={cn(
        "w-full flex flex-col items-center justify-center mb-0 h-screen min-h-screen snap-start snap-always"
      )}
    >
      <h1 
        className="text-xl md:text-2xl lg:text-3xl tracking-tight uppercase text-black/75"
        style={{ fontFamily: 'var(--font-art-company)' }}
      >
        Cynthia Cui is a designer.
      </h1>
      <motion.button 
        className={cn(buttonBase, "my-4")} 
        onClick={onNavigateToWork}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        View my work
      </motion.button>
    </section>
  );
}