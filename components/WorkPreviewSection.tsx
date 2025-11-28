"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { projects, Project } from "@/lib/projects";
import { useState, useRef, useEffect } from "react";
import { cn, projectGrid, sectionSpacingNone, marginBottom } from "@/lib/classNames";
import { isTouchDevice } from "@/lib/utils";

interface WorkPreviewSectionProps {
  onOpenModal: (project: Project) => void;
}

export function WorkPreviewSection({ onOpenModal }: WorkPreviewSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDeviceState, setIsTouchDeviceState] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldScrollHorizontally = projects.length > 4;

  // Detect touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDeviceState(isTouchDevice());
    };
    
    checkTouchDevice();
    // Re-check on resize in case of device orientation change
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Determine if horizontal scroll should be enabled
  // Enable on hover (desktop) or always on touch devices
  const shouldEnableHorizontalScroll = shouldScrollHorizontally && (isHovered || isTouchDeviceState);

  // Attach wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !shouldScrollHorizontally) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if user is scrolling horizontally (deltaX) or vertically (deltaY)
      // On trackpads, horizontal scroll comes as deltaX and should work naturally
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      // If user is scrolling horizontally, let native scrolling handle it
      if (isHorizontalScroll && e.deltaX !== 0) {
        return;
      }
      
      // Only convert vertical scroll to horizontal when:
      // 1. Container should scroll horizontally
      // 2. User is actively hovering (not just on touch devices - they can use native scroll)
      // 3. The vertical scroll is significant enough to be intentional
      const shouldConvertVertical = shouldScrollHorizontally && isHovered && Math.abs(e.deltaY) > 0;
      if (!shouldConvertVertical) return;
      
      // Check if container can scroll in the direction user wants
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      
      const canScrollLeft = scrollLeft > 1; // Use 1px threshold for floating point precision
      const canScrollRight = scrollLeft < maxScrollLeft - 1;
      const wantsToScrollDown = e.deltaY > 0;
      const wantsToScrollUp = e.deltaY < 0;
      
      // Only intercept if:
      // - User wants to scroll down AND container can scroll right, OR
      // - User wants to scroll up AND container can scroll left
      // This prevents blocking normal page scroll when at container boundaries
      const shouldIntercept = 
        (wantsToScrollDown && canScrollRight) || 
        (wantsToScrollUp && canScrollLeft);
      
      if (!shouldIntercept) {
        // Let the page scroll normally if we're at a boundary
        return;
      }
      
      // Convert vertical scroll to horizontal when hovering (mouse wheel scrolling)
      // Prevent default vertical scrolling only when we're actually going to scroll
      e.preventDefault();
      e.stopPropagation();
      
      // Apply scroll directly for immediate, responsive scrolling
      // Direct assignment is the smoothest for wheel events
      const scrollAmount = e.deltaY * 1.5;
      container.scrollLeft += scrollAmount;
    };

    // Use addEventListener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [shouldScrollHorizontally, isHovered, isTouchDeviceState]);

  return (
    <section className={sectionSpacingNone}>
      <div>
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className={cn(
              projectGrid, 
              marginBottom,
              shouldScrollHorizontally && "flex-nowrap",
              shouldScrollHorizontally && "overflow-x-auto scrollbar-hide"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              ...(shouldScrollHorizontally ? { 
                overflowX: 'auto',
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch',
                willChange: 'scroll-position'
              } : {})
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className={shouldScrollHorizontally ? "shrink-0" : undefined}
                style={{
                  ...(shouldScrollHorizontally ? { minWidth: 'calc(25% - 0.5rem)' } : {}),
                  paddingTop: '2rem',
                  paddingBottom: '2rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  height: '100%',
                  display: 'flex'
                }}
              >
                <ProjectCard
                  project={project}
                  onOpen={onOpenModal}
                  isContainerHovered={shouldEnableHorizontalScroll}
                />
              </div>
            ))}
          </div>
          {shouldScrollHorizontally && (
            <>
              {/* Left gradient fade */}
              <div
                className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to right, #ffffff, transparent)'
                }}
              />
              {/* Right gradient fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to left, #ffffff, transparent)'
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

