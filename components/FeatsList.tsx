import ImageReval from "./ImageReval";

interface FeatListProps {
  title: string;
  description: string;
  index: number;
  images: string[];
}

const FeatsList = ({ title, description, index, images }: FeatListProps) => {
  const formattedIndex = index < 10 ? `0${index + 1}` : `${index}`;

  return (
    <div className="p-4 pt-6 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <p className="text-neutral-100 text-xl font-cooper font-thin leading-tight mb-4 md:mb-0">
          {title}
        </p>
        <p className="text-neutral-400 text-[clamp(12px,1vw,16px)] leading-relaxed md:max-w-sm">
          {description}
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 pt-10 last:pb-4 not-last:pb-10 lg:last:pb-10 not-last:border-b not-last:border-neutral-700">
        <p className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-300 uppercase font-medium tracking-wider mb-1 lg:col-span-2">
          {formattedIndex}
        </p>
        <FeatItem images={images} />
      </div>
    </div>
  );
};

const FeatItem = ({ images = [] }: { images?: string[] }) => {
  // Keep the showCase visiable if there is no provided images
  const [main, ...rest] = images.length
    ? images
    : [
        "/images/category/varient-1.jpg",
        "/images/category/olives-1.jpg",
        "/images/category/olives-2.jpg",
      ];

  return (
    <div className="md:col-span-10 md:col-start-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:grid-rows-2">
        {/* Main large image */}
        <ImageReval
          source={main}
          classVals="col-span-2 md:row-span-2 h-60 md:h-[520px]"
          imgAlt="Main showcase image"
        />

        {/* Secondary images */}
        {rest.slice(0, 2).map((src, i) => (
          <ImageReval
            key={i}
            classVals="h-48 w-full md:h-[252px]"
            source={src}
            imgAlt={`Showcase image ${i + 2}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatsList;
