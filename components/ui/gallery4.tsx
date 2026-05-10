"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Image from "next/image";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  quality?: number;
  priority?: boolean;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({
  title = "Selected Work",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="works">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e78a53]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl tracking-tight premium-silver-gradient flex flex-col md:flex-row items-center gap-x-4 font-normal">
                <span>{title.split(' ')[0]}</span>
                <span className="font-display italic font-bold">{title.split(' ').slice(1).join(' ')}.</span>
              </h2>
              <p className="max-w-md text-white/40 mt-6 text-lg">{description}</p>
            </motion.div>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto w-12 h-12 rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto w-12 h-12 rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full relative z-10">
        <Carousel
          setApi={setCarouselApi}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            align: "center",
            loop: true,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full px-4"
              >
                <a href={item.href} target="_blank" rel="noreferrer" className="group block h-full">
                  <div className="group/card relative h-full min-h-[25rem] md:min-h-[32rem] max-w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] aspect-[4/3] md:aspect-[16/9] transition-all duration-700 hover:border-[#e78a53]/50 hover:shadow-2xl hover:shadow-[#e78a53]/20">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={item.quality || 75}
                      priority={item.priority}
                      className="absolute h-full w-full object-cover object-top transition-transform duration-1000 group-hover/card:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 h-full bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply opacity-90 group-hover/card:opacity-70 transition-opacity duration-700" />
                    
                    {/* Hover Overlay Action (View Website) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 z-20">
                      <div
                        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-xl transform scale-90 group-hover/card:scale-100 transition-transform duration-500"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Website
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-8 z-10">
                      <div className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover/card:text-[#e78a53]">
                        {item.title}
                      </div>
                      <div className="text-white/60 line-clamp-3 text-base">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-12 flex justify-center gap-3">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? "w-10 bg-[#e78a53]" : "w-3 bg-white/20 hover:bg-white/50"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
