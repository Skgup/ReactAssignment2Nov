import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

export default function RestaurantDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get restaurant from state
  const restaurant = location.state?.restaurant || {};

  // ✅ Image fallback
  const imgSrc =
    restaurant.logo ||
    restaurant.cover_image ||
    restaurant.image ||
    restaurant.image_url ||
    "https://via.placeholder.com/800x500?text=Restaurant+Image";

  // ✅ Draggable logo logic remains same
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const imgRef = useRef(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    e.preventDefault();
    setDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - pos.x,
      y: clientY - pos.y,
    });
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const cRect = container.getBoundingClientRect();
    const lRect = logo.getBoundingClientRect();
    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    newX = Math.max(0, Math.min(newX, cRect.width - lRect.width));
    newY = Math.max(0, Math.min(newY, cRect.height - lRect.height));

    setPos({ x: newX, y: newY });
  };

  const endDrag = () => setDragging(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ===== Top Image ===== */}
      <div className="relative w-full h-[380px]" ref={containerRef}>
        <img
          ref={imgRef}
          src={imgSrc}
          alt={restaurant.restaurant_name}
          className="w-full h-full object-cover"
        />

        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Draggable Logo */}
        <img
          ref={logoRef}
          src={restaurant.logo}
          alt="Restaurant Logo"
          className="absolute w-24 h-24 object-contain cursor-move rounded-full border-2 border-white shadow-lg"
          style={{ left: pos.x, top: pos.y, touchAction: "none" }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onMouseMove={onDrag}
          onTouchMove={onDrag}
          onMouseUp={endDrag}
          onTouchEnd={endDrag}
          draggable={false}
        />
      </div>

      {/* ===== Details Section ===== */}
      <div className="-mt-6 bg-white rounded-t-3xl shadow-lg px-6 pt-8 pb-12">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {restaurant.restaurant_name || "Restaurant Name"}
          </h1>

          <div className="flex items-center gap-1 text-gray-700">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-sm">
              {restaurant.rating || "4.5"}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-3">
          {restaurant.address_complete || "Address not available"}
        </p>

        {/* Offers */}
        <div className="flex items-center gap-2 text-orange-500 font-medium mb-5">
          <span>🏷️</span> 4 Offers Trending
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {restaurant.description ||
            "Our delicate vanilla cake swirled with chocolate and filled with mocha chocolate chip cream and a layer of dark chocolate ganache."}
        </p>
      </div>
    </div>
  );
}
