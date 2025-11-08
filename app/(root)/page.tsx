import Showcase from "@/components/Showcase";
import Hero from "@/components/Hero";
import FeaturesShow from "@/components/FeaturesShow";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Showcase />
      <FeaturesShow />
    </div>
  );
}
