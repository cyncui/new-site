"use client";

import { Project } from "@/lib/projects";
import { useEffect, useLayoutEffect, useState, useRef, UIEventHandler } from "react";
import Image from "next/image";
import { cn, modalOverlay, modalContent, modalCloseButton, modalCloseIcon, modalTitle, modalMeta, modalBody, modalSectionTitle, modalSectionText, imageRelative, widthHalf, pointerEventsNone, modalCloseButtonMobile } from "@/lib/classNames";
import { isMobile, createEscapeKeyHandler, setBodyOverflow, clearTimeoutRef, cancelAnimationFrameRef, deferStateUpdate } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Initialize with a check if we're in the browser
  const [isMobileDevice, setIsMobileDevice] = useState(() => isMobile());
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(isMobile());
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Store project locally so it persists during close animation
  useEffect(() => {
    if (project) {
      // Defer setState to avoid lint error
      return deferStateUpdate(() => {
        setDisplayProject(project);
      });
    }
  }, [project]);

  // Handle mounting based on project and isOpen
  useEffect(() => {
    if (isOpen && project) {
      // Use setTimeout to defer setState and avoid lint error
      clearTimeoutRef(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMounted(true);
      }, 0);
    } else if (!isOpen && isMounted) {
      // When closing, ensure shouldAnimate stays true to allow reverse animation
      // Then delay unmounting to allow close animation to complete
      // Match the transition duration (300ms) plus a small buffer
      clearTimeoutRef(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMounted(false);
        setShouldAnimate(false);
        setDisplayProject(null);
      }, 350);
    }
    return () => {
      clearTimeoutRef(timeoutRef.current);
    };
  }, [isOpen, project, isMounted]);

  // Handle animation trigger - use useLayoutEffect to ensure state is set before paint
  useLayoutEffect(() => {
    if (isMounted) {
      if (isOpen) {
        // Force a re-render cycle to ensure animation triggers
        // Start with closed state, then animate to open
        cancelAnimationFrameRef(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = requestAnimationFrame(() => {
            setShouldAnimate(true);
          });
        });
      } else if (!isOpen && shouldAnimate) {
        // When closing, keep shouldAnimate true to allow reverse animation
        // The transform will change from open to closed, triggering the transition
        // Don't change shouldAnimate here - it will be reset after animation completes
      }
    }
    return () => {
      cancelAnimationFrameRef(rafRef.current);
    };
  }, [isMounted, isOpen, shouldAnimate]);

  useEffect(() => {
    setBodyOverflow(isOpen);
    return () => {
      setBodyOverflow(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = createEscapeKeyHandler(onClose, isOpen);
    window.addEventListener("keyup", handleEscape);
    return () => {
      window.removeEventListener("keyup", handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle 3D rotation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobileDevice || !isOpen || !shouldAnimate) return;
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degrees
    const rotateY = ((x - centerX) / centerX) * 15; // Max 15 degrees
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isMobileDevice) return;
    setRotation({ x: 0, y: 0 });
  };

  const onScroll: UIEventHandler<HTMLDivElement> = () => {
    // Scroll handler can be used for scroll position tracking if needed
  };

  if (!displayProject || !isMounted) return null;

  const imageUrl = displayProject.image || "https://i.pinimg.com/1200x/81/61/92/816192cdb2e4b6538a33b119713d2cda.jpg";

  return (
    <>
      {/* Image side - left half - hidden on mobile */}
      <div
          className={cn(
          modalOverlay,
          widthHalf,
          "hidden md:block", // Hide on mobile, show on medium screens and up
          !(shouldAnimate && isOpen) && pointerEventsNone
        )}
        style={{ 
          display: isMobileDevice ? 'none' : undefined, // Double-check with JS
          transform: isOpen && shouldAnimate
            ? 'translateX(0) translateY(0)' 
            : 'translateX(-100%)',
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform'
        }}
      >
        <div
            ref={imageContainerRef}
            className={imageRelative}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isOpen && shouldAnimate ? 'scale(1)' : 'scale(1)',
              transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
              perspective: '1000px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '60%',
                height: '60%',
                maxWidth: '100%',
                maxHeight: '100%',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.3s ease-out' : 'none',
              }}
            >
              <Image
                src={imageUrl}
                alt={displayProject.title}
                fill
                className="object-contain"
                priority
                sizes="25vw"
              />
            </div>
          </div>
        </div>

      {/* Content side - right half */}
      <div
        className={cn(
          modalContent,
          isMobileDevice ? "top-0 left-0 w-screen p-6" : "top-0 left-1/2 w-1/2",
          !(shouldAnimate && isOpen) && pointerEventsNone
        )}
        style={{ 
          transform: isOpen && shouldAnimate
            ? 'translateX(0) translateY(0)' 
            : isMobileDevice 
              ? 'translateY(100%)' 
              : 'translateX(150%)',
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform'
        }}
        onScroll={onScroll}
      >
        {/* Close button */}
        <div
          className={isMobileDevice ? modalCloseButtonMobile : modalCloseButton}
          onClick={onClose}
        >
          <Image src="/svg/exit.svg" width={24} height={24} className={modalCloseIcon} alt="Close" />
        </div>

        {/* Title */}
        <h1 className={modalTitle}>{displayProject.title}</h1>
        
        {/* Year */}
        <p className={modalMeta}>
          {displayProject.year}      
        </p>

        {/* Body Content */}
        <div className={modalBody}>
          {displayProject.details?.overview && (
            <div>
              <h3 className={modalSectionTitle}>Overview</h3>
              <p className={modalSectionText}>{displayProject.details.overview}</p>
            </div>
          )}

          {displayProject.details?.role && (
            <div>
              <h3 className={modalSectionTitle}>Role</h3>
              <p className={modalSectionText}>{displayProject.details.role}</p>
            </div>
          )}

          {displayProject.details?.tools && displayProject.details.tools.length > 0 && (
            <div>
              <h3 className={modalSectionTitle}>Tools</h3>
              <p className={modalSectionText}>
                {displayProject.details.tools.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

