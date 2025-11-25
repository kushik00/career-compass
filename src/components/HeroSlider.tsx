import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import slide1 from "@/assets/hero-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";

const slides = [
  {
    image: slide1,
    title: "Знайди свій шлях у майбутнє",
    description: "Пройди тест та дізнайся, яка професія підходить саме тобі"
  },
  {
    image: slide2,
    title: "Відкрий свої сильні сторони",
    description: "Дізнайся про свої таланти та здібності для успішної кар'єри"
  },
  {
    image: slide3,
    title: "Обери правильний університет",
    description: "Отримай рекомендації щодо навчальних закладів"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-3xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide 
              ? "opacity-100 translate-x-0" 
              : index < currentSlide 
              ? "opacity-0 -translate-x-full" 
              : "opacity-0 translate-x-full"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-card">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl animate-slide-up">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/80 text-foreground"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/50 hover:bg-card/80 text-foreground"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-card w-8" 
                : "bg-card/50 w-2"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
