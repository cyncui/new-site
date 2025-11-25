"use client";

import { Project } from "@/lib/projects";
import Image from "next/image";
import { useState, useEffect } from "react";
import { projectCard } from "@/lib/classNames";
import { getRandomRotation, deferStateUpdate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  isContainerHovered?: boolean;
}

export function ProjectCard({ project, onOpen, isContainerHovered = false }: ProjectCardProps) {
  const imageUrl = project.image || "https://i.pinimg.com/1200x/81/61/92/816192cdb2e4b6538a33b119713d2cda.jpg";
  
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    // Using deferStateUpdate to defer state update and avoid hydration mismatch
    // This is necessary because Math.random() produces different values on server vs client
    return deferStateUpdate(() => {
      setRotation(getRandomRotation());
    });
  }, []);
  
  return (
    <button
      onClick={() => onOpen(project)}
      className={projectCard}
      style={{ 
        transform: `rotate(${isContainerHovered ? 0 : rotation}deg)`,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        zIndex: isContainerHovered ? 1 : 'auto',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        height: '100%',
        width: '100%'
      }}
    >
      <Image
        src={imageUrl}
        alt={project.title}
        width={500}
        height={500}
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </button>
  );
}

