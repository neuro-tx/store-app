import Showcase from "@/components/sections/Showcase";
import Hero from "@/components/sections/Hero";
import FeaturesShow from "@/components/sections/FeaturesShow";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Showcase />
      <FeaturesShow />
      <Features />
    </div>
  );
}
