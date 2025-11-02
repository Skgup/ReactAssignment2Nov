import React, { useState, useEffect, useRef } from "react";

const banners = [
  {
    id: 1,
    title: "VEGGIE FRIENDLY EATERIES",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    button: "TRY NOW",
  },
  {
    id: 2,
    title: "SWEET DELIGHTS NEARBY",
    image:
      "https://images.unsplash.com/photo-1600891963931-960b1e4a0845?auto=format&fit=crop&w=800&q=80",
    button: "ORDER NOW",
  },
  {
    id: 3,
    title: "TRENDING RESTAURANTS",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    button: "EXPLORE",
  },
];

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // 👉 Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 👉 Swipe handlers
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) nextSlide(); // swipe left
    if (diff < -50) prevSlide(); // swipe right
    touchStart.current = null;
    touchEnd.current = null;
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-md"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-5">
              <h3 className="text-white text-lg font-semibold">
                {banner.title}
              </h3>
              <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm w-fit">
                {banner.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              i === activeIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
