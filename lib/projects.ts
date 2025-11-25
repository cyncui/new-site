export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image?: string;
  details?: {
    overview?: string;
    role?: string;
    tools?: string[];
    link?: string;
  };
  projectImages?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Japanese Language Learning App",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/41358699/original_0cb49048673c932cad78e44682e24170.png?1764032946?bc=0",
    description: "Improved information hierarchy and navigation for the app.",
    category: "Product Design",
    year: "2025",
    details: {
      overview:
        "For Bunpo’s new Dialogues, Leagues, and Monthly Challenges, I audited the experience and redesigned key flows to boost motivation and clarity. I shifted Dialogues to feel like real chat, streamlined Leagues with podium‑focused visuals and rewards, and refreshed the homepage with status‑colored navigation. Monthly Challenges now read at a glance, with pagination, visible medals, and tidy details. Net effect, a friendlier, more engaging path for consistent language learning.",
      role: "Product Designer, User Researcher",
      tools: ["Figma", "Miro", "UserTesting"],
    },
    projectImages: [
      "https://d2w9rnfcy7mm78.cloudfront.net/41358699/original_0cb49048673c932cad78e44682e24170.png?1764032946?bc=0",
      "https://d2w9rnfcy7mm78.cloudfront.net/41358699/original_0cb49048673c932cad78e44682e24170.png?1764032946?bc=0",
    ],
  },
  {
    id: "2",
    title: "Health & Wellness App",
    description:
      "Designing intuitive experiences for health tracking and wellness management.",
    category: "Product Design",
    year: "2023",
    details: {
      overview:
        "Designed a mobile-first health tracking application that helps users monitor their wellness goals. Focused on creating a supportive, non-judgmental interface that encourages positive behavior change.",
      role: "Product Designer",
      tools: ["Figma", "Principle", "After Effects"],
      link: "#",
    },
  },
  {
    id: "3",
    title: "Conversational AI Interface",
    description:
      "Exploring natural language interactions for customer support systems.",
    category: "UX Design",
    year: "2023",
    details: {
      overview:
        "Designed conversational interfaces for AI-powered customer support, focusing on creating empathetic and helpful interactions. Worked closely with NLP engineers to ensure the design supported the technical capabilities.",
      role: "UX Designer",
      tools: ["Figma", "Sketch", "Prototyping"],
      link: "#",
    },
  },
  {
    id: "4",
    title: "Community Platform",
    description: "Building connections through thoughtful community design.",
    category: "Product Design",
    year: "2022",
    details: {
      overview:
        "Designed a community platform that facilitates meaningful connections between users. Focused on creating safe spaces for discussion and collaboration, with emphasis on moderation tools and user trust.",
      role: "Product Designer",
      tools: ["Figma", "Notion", "User Research"],
      link: "#",
    },
  },
  {
    id: "5",
    title: "E-Commerce Mobile App",
    description: "Redesigning the shopping experience for mobile users.",
    category: "Product Design",
    year: "2024",
    details: {
      overview:
        "Created an intuitive mobile shopping experience that reduces friction in the purchase journey. Focused on quick product discovery and seamless checkout flow.",
      role: "Senior Product Designer",
      tools: ["Figma", "Prototype", "User Research"],
      link: "#",
    },
  },
  {
    id: "6",
    title: "Design System Library",
    description:
      "Building a comprehensive design system for consistent user experiences.",
    category: "Design Systems",
    year: "2023",
    details: {
      overview:
        "Developed a scalable design system that serves as the foundation for all product experiences. Created component libraries, documentation, and guidelines for the entire design team.",
      role: "Design Systems Lead",
      tools: ["Figma", "Storybook", "Design Tokens"],
      link: "#",
    },
  },
  {
    id: "7",
    title: "Educational Platform",
    description:
      "Making learning accessible and engaging through thoughtful design.",
    category: "Product Design",
    year: "2022",
    details: {
      overview:
        "Designed an educational platform that adapts to different learning styles. Focused on creating an inclusive experience that supports diverse learners.",
      role: "Product Designer",
      tools: ["Figma", "User Testing", "Accessibility Tools"],
      link: "#",
    },
  },
  {
    id: "8",
    title: "SaaS Dashboard",
    description: "Simplifying complex data visualization for business users.",
    category: "Product Design",
    year: "2024",
    details: {
      overview:
        "Redesigned a complex SaaS dashboard to make data insights more accessible. Reduced cognitive load while maintaining powerful functionality.",
      role: "Lead Product Designer",
      tools: ["Figma", "Data Visualization", "User Research"],
      link: "#",
    },
  },
];
