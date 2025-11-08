import React from "react";
import FeatsList from "./FeatsList";

const FeaturesShow = () => {
  const list = [
    {
      title: "تجربة فاخرة",
      description:
        "منتجات تجمع بين النكهة الأصيلة والجودة الرفيعة — من زيت الزيتون والتمور إلى التوابل والحلويات — نقدمها لك بتصميم حديث يعبّر عن أصالة دار الواحة وروح سيوة العريقة.",
      images: [
        "/images/category/varient-1.jpg",
        "/images/category/olives-1.jpg",
        "/images/category/olives-2.jpg",
      ],
    },
    {
      title: "نكهات من واحة سيوة",
      description:
        "تمور فاخرة وتوابل أصيلة تنقلك إلى عمق الواحة — حيث الطعم يعكس تاريخ المكان وروحه.",
      images: [
        "/images/category/date-1.jpg",
        "/images/category/olives-1.jpg",
        "/images/category/honey-2.jpg",
      ],
    },
  ];

  return (
    <section
      className="relative z-10 w-full bg-neutral-100 py-16 px-5 md:px-6 lg:px-8 overflow-x-hidden"
      aria-labelledby="features-products-title"
    >
      <div className="min-h-dvh text-right bg-neutral-900 rounded-2xl lg:rounded-3xl">
        <div className="w-full h-full flex flex-col gap-16 lg:gap-24 px-4 pt-16 lg:pt-24 pb-4">
          <div className="lg:grid lg:grid-cols-12 gap-24">
            <div className="flex flex-col col-span-12 lg:col-span-10 lg:col-start-3 text-right">
              <h3 className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider mb-2">
                منتجات دار الواحة
              </h3>
              <p className="text-neutral-100 text-[clamp(24px,3.3vw,56px)] font-medium leading-[1.1] lg:leading-[1.05] font-cairo">
                تشكيلة فريدة من خيرات واحة سيوة — زيت الزيتون الطبيعي، التمور
                الفاخرة، التوابل الأصيلة والحلويات التقليدية — نقدمها بروح
                الأصالة وجودة لا تُضاهى.
              </p>
            </div>
          </div>

          {list.map((item, index) => (
            <FeatsList
              key={index}
              index={index}
              description={item.description}
              title={item.title}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShow;
