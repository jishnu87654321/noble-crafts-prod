"use client"

import { Gallery4 } from "@/components/ui/gallery4"

const worksData = [
  {
    id: "shivani-skincare",
    title: "Shivani Skincare",
    description:
      "Pure. Powerful. Naturally You. We crafted a premium e-commerce experience for Shivani Skincare, focusing on elegant design and seamless user journey.",
    href: "https://www.shivaniskincare.com",
    image:
      "https://res.cloudinary.com/dsdx78fgf/image/upload/v1777824720/Screenshot_2026-05-03_212914_xesp3c.png",
  },
  {
    id: "project-placeholder-1",
    title: "Upcoming Project",
    description:
      "A new digital masterpiece is currently in the works. We are pushing the boundaries of design and technology for our next client.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    id: "project-placeholder-2",
    title: "Digital Innovation",
    description:
      "Stay tuned for a revolutionary platform that will redefine user interaction in the fintech space. Coming soon to our portfolio.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
];

export function OurWorks() {
  return (
    <Gallery4 
      title="Selected Work" 
      description="Discover how we build exceptional digital experiences. These case studies showcase real-world applications and success stories."
      items={worksData} 
    />
  );
}
