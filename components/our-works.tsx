"use client"

import { Gallery4 } from "@/components/ui/gallery4"

const worksData = [
  {
    id: "shivani-skincare",
    title: "Shivani Skincare",
    description:
      "Pure. Powerful. Naturally You. We crafted a premium e-commerce experience for Shivani Skincare, focusing on elegant design and seamless user journey.",
    href: "https://www.shivaniskincare.com",
    image: "/images/shivani-skincare.png",
    quality: 100,
    priority: true,
  },
  {
    id: "restaurant-analytics",
    title: "Restaurant Analytics",
    description:
      "Turning data into exceptional dining experiences. We built a comprehensive analytics dashboard for modern restaurants to track performance and growth.",
    href: "https://kitchen-restaurant-seven.vercel.app",
    image: "/images/restaurant-analytics.png",
    quality: 100,
  },
  {
    id: "bk-overseas",
    title: "BK Overseas",
    description:
      "Global Export & Logistics Hub. We designed a powerful platform for BK Overseas to manage their global supply chain and logistics operations seamlessly.",
    href: "https://bkoverseas.com",
    image: "/images/bk-overseas.jpg",
    quality: 100,
  },
  {
    id: "akhil-adventures",
    title: "Akhil The Adventures",
    description:
      "Unveiling the wild. We created a visually stunning travel and adventure blog for Akhil, capturing the essence of exploration through immersive design.",
    href: "https://www.akhiltheadventures.in",
    image: "/images/akhil-adventures.jpg",
    quality: 100,
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
