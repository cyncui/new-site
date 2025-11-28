import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Semantic className utilities for consistent styling across the codebase
 * These utilities group common Tailwind patterns into reusable, semantic classes
 */

// ============================================================================
// LAYOUT
// ============================================================================

export const containerBase = cn("mx-auto w-full");

export const containerPadding = cn("px-6 py-8 md:px-16");

export const flexCol = cn("flex flex-col");

export const flexRow = cn("flex flex-row");

export const flexCenter = cn("flex items-center justify-center");

export const flexBetween = cn("flex items-center justify-between");

export const flexWrap = cn("flex flex-wrap items-center");

export const spaceY = {
  none: "space-y-0",
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-6",
} as const;

export const gap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

// ============================================================================
// TEXT STYLES
// ============================================================================

export const textBase = cn("text-base");

export const textSmall = cn("text-xs");

export const textLarge = cn("text-3xl md:text-4xl");

export const textXLarge = cn("text-4xl");

export const headingBase = cn("font-sans");

export const headingLarge = cn(headingBase, "text-2xl md:text-3xl");

export const headingXLarge = cn(headingBase, "text-4xl font-bold");

export const bodyText = cn("text-base leading-normal md:leading-relaxed");

export const bodyTextSmall = cn("text-base mb-4");

export const fontBold = cn("font-bold");

export const fontNormal = cn("font-normal");

export const textMuted = cn("text-gray-500");
export const textMutedLight = cn("text-gray-400");

export const textGray = cn("text-[rgb(105, 105, 105)]");

export const textOpacity = cn("opacity-50");

export const textCenter = cn("text-center");

// ============================================================================
// LINKS
// ============================================================================

export const linkBase = cn("hover:text-[#002FA7] transition-colors duration-300");

export const linkUnderline = cn("underline underline-offset-2");

// ============================================================================
// MODALS & OVERLAYS
// ============================================================================

export const modalOverlay = cn(
  "fixed top-0 left-0 h-screen bg-black overflow-hidden z-50"
);

export const modalContent = cn(
  "fixed h-screen p-14 pt-8 flex flex-col bg-white overflow-y-scroll z-50"
);

export const modalCloseButton = cn(
  "fixed top-8 right-8 w-8 h-8 bg-black/10 hover:bg-black/20 transition-colors cursor-pointer rounded-full flex items-center justify-center z-[60]"
);

export const modalCloseButtonMobile = cn(
  "fixed top-6 right-6 w-6 h-6 bg-black/10 rounded-full flex items-center justify-center z-[60]"
);

export const modalCloseIcon = cn("opacity-30 scale-[.50]");

export const modalTitle = cn("text-xl md:text-2xl font-bold");

export const modalMeta = cn("my-2 opacity-50");

export const modalBody = cn("space-y-6 text-base leading-relaxed mt-4", textGray);

export const modalSectionTitle = cn("font-bold mb-2 tracking-wide");

export const modalSectionText = cn("text-gray-700");

// ============================================================================
// IMAGES
// ============================================================================

export const imageCover = cn("object-cover");

export const imageFull = cn("w-full h-auto object-cover");

export const imageRelative = cn("relative w-full h-full");

// ============================================================================
// BUTTONS
// ============================================================================

export const buttonBase = cn(" text-black border border-black/25 px-6 py-2 rounded-full");


// ============================================================================
// CARDS & PROJECTS
// ============================================================================

export const projectCard = cn(
  "group hover:opacity-50 transition-all duration-300 flex-1 relative hover:cursor-pointer"
);

export const projectGrid = cn("flex flex-row justify-start h-[calc(100vh-25rem)]");

// ============================================================================
// SECTIONS
// ============================================================================

export const sectionBase = cn("space-y-2");

export const sectionSpacing = cn("space-y-6");

export const sectionSpacingNone = cn("space-y-0");

export const sectionSpacingSmall = cn("space-y-1");

export const sectionSpacingLarge = cn("space-y-8");

// ============================================================================
// COMMON UTILITIES
// ============================================================================

// Width utilities
export const widthFull = cn("w-full");
export const widthHalf = cn("w-1/2");
export const widthScreen = cn("w-screen");

// Height utilities
export const heightScreen = cn("h-screen");
export const heightFull = cn("h-full");
export const minHeightScreen = cn("min-h-screen");

// Background utilities
export const bgWhite = cn("bg-white");
export const bgBlack = cn("bg-black");

// Text color utilities
export const textBlack = cn("text-black");
export const textWhite = cn("text-white");

// Spacing utilities
export const paddingTop = cn("pt-4");
export const paddingTopSmall = cn("pt-8");
export const marginTop = cn("mt-4");
export const marginTopLarge = cn("mt-6");
export const marginBottom = cn("mb-2");
export const marginBottomLarge = cn("mb-6");
export const marginY = cn("my-2");

// Flex alignment utilities
export const flexItemsCenter = cn("items-center");
export const flexJustifyCenter = cn("justify-center");

// Position utilities
export const fixed = cn("fixed");
export const relative = cn("relative");
export const absolute = cn("absolute");

// Overflow utilities
export const overflowHidden = cn("overflow-hidden");
export const overflowYScroll = cn("overflow-y-scroll");

// Z-index utilities
export const z50 = cn("z-50");
export const z60 = cn("z-[60]");

// Opacity utilities
export const opacity30 = cn("opacity-30");
export const opacity50 = cn("opacity-50");
export const opacity70 = cn("opacity-70");

// Transition utilities
export const transitionAll = cn("transition-all duration-300");
export const transitionColors = cn("transition-colors");

// Border radius utilities
export const roundedFull = cn("rounded-full");

// Select utilities
export const selectNone = cn("select-none");

// Leading utilities
export const leadingRelaxed = cn("leading-relaxed");

// Font utilities
export const fontSerif = cn("font-serif");
export const antialiased = cn("antialiased");

// Pointer events utilities
export const pointerEventsNone = cn("pointer-events-none");

// Common combinations
export const flexRowCenter = cn(flexRow, flexItemsCenter);
export const flexColCenter = cn(flexCol, flexItemsCenter, flexJustifyCenter);
