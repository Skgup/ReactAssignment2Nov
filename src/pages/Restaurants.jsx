import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../api";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "./Banners";
export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchRestaurants(118);
        const data = res?.data?.data?.results || [];
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch failed:", err.response || err);
        alert("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-xs text-gray-400">Pre Order From</p>
            <h1 className="text-lg font-semibold">Connaught Place</h1>
          </div>
          <div className="flex gap-3 items-center">
            <button className="w-2 h-2 bg-gray-400 rounded-full"></button>
            <button className="w-2 h-2 bg-gray-400 rounded-full"></button>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="px-4 mt-4 space-y-8">
          {/* Greeting Section */}
          <div className="flex items-center justify-between">
            <div className="bg-white rounded-xl shadow p-4 flex-1">
              <h2 className="font-semibold text-lg">Karan</h2>
              <p className="text-sm text-gray-500">
                Let’s explore this evening
              </p>
            </div>
            <div className="flex gap-3 ml-3">
              <div className="bg-white shadow p-3 rounded-xl text-center">
                <div className="w-10 h-10 mx-auto mb-1 flex items-center justify-center rounded-lg bg-orange-100">
                  <span className="text-orange-500 text-xl">🏷️</span>
                </div>
                <p className="text-xs font-medium text-gray-700">Offers</p>
              </div>
              <div className="bg-white shadow p-3 rounded-xl text-center">
                <div className="w-10 h-10 mx-auto mb-1 flex items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-500 text-xl">💳</span>
                </div>
                <p className="text-xs font-medium text-gray-700">Wallet</p>
              </div>
            </div>
          </div>

          {/* “Your Taste” horizontal scroll */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Your taste</h3>
              <button className="text-sm text-gray-500">see all →</button>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {restaurants.slice(0, 3).map((r) => (
                <div
                  key={r.restaurant_id}
                  onClick={() =>
                    navigate(`/restaurant/${r.restaurant_id}`, {
                      state: { restaurant: r },
                    })
                  }
                  className="flex-shrink-0 bg-white rounded-xl shadow w-40 overflow-hidden"
                >
                  <img
                    src={r.logo}
                    alt={r.restaurant_name}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-2">
                    <h4 className="font-semibold text-sm truncate">
                      {r.restaurant_name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      Connaught Place, New Delhi
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Veggie Banner */}
      <BannerCarousel />

          {/* Popular Ones */}
          <section>
            <h3 className="font-semibold text-lg mb-3">Popular Ones</h3>
            <div className="space-y-4">
              {restaurants.map((r, idx) => (
                <div
                  key={r.restaurant_id || idx}
                  className="flex bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                  onClick={() =>
                    navigate(`/restaurant/${r.restaurant_id}`, {
                      state: { restaurant: r },
                    })
                  }
                >
                  <img
                    src={r.logo}
                    alt={r.restaurant_name}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <h4 className="font-semibold text-base">
                      {r.restaurant_name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      Cakes, Pastry, Pastas
                    </p>
                    <p className="text-xs text-orange-500 font-medium mt-1">
                      🎉 4 Offers trending
                    </p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <p>⭐ 4.5 Popularity</p>
                      <p>$200 Cost for two</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
