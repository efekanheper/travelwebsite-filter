"use client";

import React, { useState, useEffect } from "react";
import { Tour } from "../../../constans/index";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

const FilteredTours = ({ filteredData }: { filteredData: Tour[] }) => {
  useEffect(() => {
    // Update filtered tours based on props
  }, [filteredData]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No tours found</h2>
          <p className="text-gray-600">
            Try adjusting your filters to find more results.
          </p>
        </div>
      )}
    </div>
  );
};

// Tour Card Component
interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden rounded-xl shadow-md transition-transform hover:shadow-lg hover:scale-[1.02] relative">
      <div className="relative">
        <Image
          src={tour.image || "/api/placeholder/400/250"}
          alt={tour.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />

        {tour.discount && (
          <div className="absolute top-4 left-4 bg-white rounded-lg px-2 py-1 text-orange-600 font-semibold text-sm">
            {tour.discount}% OFF
          </div>
        )}

        <button
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart className={isFavorite ? "text-red-500" : "text-gray-300"} />
        </button>

        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-md">
          Tour
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center text-yellow-400 mr-2">
            <FaStar />
            <span className="ml-1 text-black">{tour.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500">({tour.reviewCount})</span>
        </div>

        <div className="flex items-center text-gray-500 mb-2">
          <FaLocationDot className="mr-1 text-orange-400" />
          <span className="text-sm">{tour.location}</span>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tour.name}</h3>

        <div className="flex justify-between items-center mt-4">
          <div>
            {tour.discount ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  THB {tour.price.toLocaleString()}
                </span>
                <span className="text-xl font-bold ml-2">
                  THB{" "}
                  {Math.round(
                    tour.price * (1 - tour.discount / 100)
                  ).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">
                THB {tour.price.toLocaleString()}
              </span>
            )}
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors">
            Book now
          </button>
        </div>

        <div className="mt-2">
          <a href="#" className="text-orange-500 text-sm flex items-center">
            Details →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilteredTours;
