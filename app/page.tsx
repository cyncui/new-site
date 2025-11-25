"use client";

import { HeaderSection } from "@/components/HeaderSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkPreviewSection } from "@/components/WorkPreviewSection";
import { ContactSection } from "@/components/ContactSection";
import { ProjectModal } from "@/components/ProjectModal";
import { Project } from "@/lib/projects";
import { useState } from "react";
import {
  cn,
  minHeightScreen,
  bgWhite,
  containerBase,
  containerPadding,
  sectionBase,
} from "@/lib/classNames";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className={cn(minHeightScreen, bgWhite)}>
      <main className={cn(containerBase, containerPadding)}>
        <div className={sectionBase}>
          <HeaderSection />
          <AboutSection />
          <WorkPreviewSection onOpenModal={handleOpenModal} />
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
