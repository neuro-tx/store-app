import Showcase from "@/components/sections/Showcase";
import Hero from "@/components/sections/Hero";
import CollectionView from "@/components/sections/CollectionView";
import Features from "@/components/sections/Features";
import CategoriesSection from "@/components/sections/CategoriesSection";
import Offer from "@/components/sections/Offer";
import AboutPreview from "@/components/AboutPreview";

export default async function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Showcase />
      <CategoriesSection />
      <CollectionView />
      <Offer />
      <Features />
      <AboutPreview />
    </main>
  );
}
