import Showcase from "@/components/sections/Showcase";
import Hero from "@/components/sections/Hero";
import FeaturesShow from "@/components/sections/FeaturesShow";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Showcase />
      <FeaturesShow />
    </div>
  );
}
