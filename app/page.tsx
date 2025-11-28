"use client";

import { HeaderSection } from "@/components/HeaderSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkPreviewSection } from "@/components/WorkPreviewSection";
import { ContactSection } from "@/components/ContactSection";
import { ProjectModal } from "@/components/ProjectModal";
import { Project } from "@/lib/projects";
import { useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import {
  cn,
  bgWhite,
  containerBase,
} from "@/lib/classNames";
import WelcomeSection from "@/components/WelcomeSection";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateToWork = () => {
    if (workSectionRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = workSectionRef.current;
      
      // Get the position relative to the scroll container
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top - containerRect.top + container.scrollTop;

      // Use framer-motion's animate for smooth scrolling
      animate(container.scrollTop, elementPosition, {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth transition
        onUpdate: (latest) => {
          container.scrollTop = latest;
        },
      });
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      className={cn(bgWhite, "snap-y snap-mandatory overflow-y-scroll h-screen")}
    >
      <WelcomeSection onNavigateToWork={handleNavigateToWork} />
      <main className={cn(containerBase, "px-6 pb-8 md:px-16 md:pb-8 pt-0 snap-start h-screen flex flex-col justify-center")}>
        <div className="space-y-0 flex-1 flex flex-col">
          {/* <HeaderSection /> */}
          {/* <AboutSection /> */}
          <motion.div
            ref={workSectionRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <WorkPreviewSection onOpenModal={handleOpenModal} />
          </motion.div>
          <ContactSection />
        </div>
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
