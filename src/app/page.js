import Image from "next/image";
import { fetchFlaskAPI, fetchStrapiAPI } from "@/app/utils";
import World from "@/models/World";
import WorldTable from "@/components/WorldTable";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import BackgroundEffects from "@/components/BackgroundEffects";

async function getData() {
  const res = await fetchStrapiAPI("/messages/1");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.data) {
    console.log("src/app/page.js", res);
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res;
}

async function getWorlds() {
  return await new World().getAll();
}

const quotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
  "The way to get started is to quit talking and begin doing. -Walt Disney",
  "Your time is limited, don't waste it living someone else's life. -Steve Jobs",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. -Robert Louis Stevenson",
  "The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
];

// LandingPage.js
const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <BackgroundEffects />
    </div>
  );
};

export default async function Home() {
  // const res = await getData()
  // const worlds = await getWorlds();

  return <LandingPage />;
}
