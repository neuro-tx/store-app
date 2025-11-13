import React from "react";
import FeatsList from "../FeatsList";
import AnimatedText from "../AnimatedText";

const CollectionView = () => {
  const list = [
    {
      title: "تجربة فاخرة",
      description:
        "منتجات تجمع بين النكهة الأصيلة والجودة الرفيعة — من زيت الزيتون والتمور إلى التوابل ومستحضرات التجميل — نقدمها لك بتصميم حديث يعبّر عن أصالة دار الواحة وروح سيوة العريقة.",
      images: [
        "/images/reval/reval-1.jpg",
        "/images/reval/reval-2.jpg",
        "/images/reval/reval-6.jpg",
      ],
    },
    {
      title: "نكهات من واحة سيوة",
      description:
        "تمور فاخرة، قهوة عربية، وتوابل أصيلة تنقلك إلى عمق الواحة — حيث الطعم يعكس تاريخ المكان وروحه.",
      images: [
        "/images/reval/reval-3.jpg",
        "/images/reval/reval-4.jpg",
        "/images/reval/reval-5.jpg",
      ],
    },
  ];

  return (
    <section
      className="section"
      aria-labelledby="features-products-title"
    >
      <div className="min-h-dvh text-right section-container">
        <div className="w-full h-full flex flex-col gap-16 lg:gap-24 px-4 pt-16 lg:pt-24 pb-4">
          <div className="lg:grid lg:grid-cols-12 gap-24">
            <div className="flex flex-col col-span-12 lg:col-span-10 lg:col-start-3 text-right">
              <AnimatedText>
                <h3 className="text-xs lg:text-[clamp(14px,0.8vw,18px)] text-neutral-400 uppercase font-medium tracking-wider mb-2">
                  منتجات دار الواحة
                </h3>
              </AnimatedText>
              <AnimatedText>
                <p className="text-neutral-100 text-[clamp(24px,3.3vw,56px)] font-medium leading-[1.1] lg:leading-[1.05] font-cairo">
                  تشكيلة فريدة من خيرات واحة سيوة — زيت الزيتون الطبيعي، التمور
                  الفاخرة، التوابل الأصيلة والحلويات التقليدية — نقدمها بروح
                  الأصالة وجودة لا تُضاهى.
                </p>
              </AnimatedText>
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

export default CollectionView;
