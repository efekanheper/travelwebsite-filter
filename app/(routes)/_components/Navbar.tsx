"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";

import {
  tours,
  themes,
  activities,
  vehicles,
  features as tourFeatures,
  Tour,
} from "@/constans/index";

interface FilterState {
  searchLocation: string;
  selectedTheme: string;
  selectedActivities: string[];
  price: number;
  startTime: number;
  groupSize: number;
  selectedVehicle: string;
  features: {
    transfer: boolean;
    halal: boolean;
    vegetarian: boolean;
  };
}

const Navbar = ({
  setFilteredData,
}: {
  setFilteredData: (data: Tour[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchLocation: "",
    selectedTheme: "",
    selectedActivities: [],
    price: 25000,
    startTime: 24,
    groupSize: 100,
    selectedVehicle: "",
    features: {
      transfer: false,
      halal: false,
      vegetarian: false,
    },
  });

  const [discountedTours, setDiscountedTours] = useState<Tour[]>(tours);

  useEffect(() => {
    const toursWithDiscounts = tours.map((tour) => ({
      ...tour,
      discount: Math.random() > 0.7 ? 30 : undefined,
    }));
    setDiscountedTours(toursWithDiscounts);
  }, []);

  const applyFilters = () => {
    let results = [...discountedTours];

    if (filters.searchLocation.trim()) {
      results = results.filter((tour) =>
        tour.location
          .toLowerCase()
          .includes(filters.searchLocation.toLowerCase())
      );
    }

    if (filters.selectedTheme) {
      results = results.filter((tour) =>
        tour.themes.includes(filters.selectedTheme)
      );
    }

    if (filters.selectedActivities.length > 0) {
      results = results.filter((tour) =>
        filters.selectedActivities.some((activity) =>
          tour.activities.includes(activity)
        )
      );
    }

    results = results.filter((tour) => tour.price <= filters.price);

    results = results.filter((tour) => tour.startTime <= filters.startTime);

    results = results.filter((tour) => tour.groupSize <= filters.groupSize);

    if (filters.selectedVehicle) {
      results = results.filter((tour) =>
        tour.vehicles.includes(filters.selectedVehicle)
      );
    }

    Object.entries(filters.features).forEach(([key, value]) => {
      if (value) {
        results = results.filter((tour) => tour.features.includes(key));
      }
    });

    setFilteredData(results);
    setIsOpen(false);
  };

  const handleInputChange = (
    key: keyof FilterState,
    value: string | number | typeof filters.features
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSelectedCategory(null);
  };

  const handleReset = () => {
    setFilters({
      searchLocation: "",
      selectedTheme: "",
      selectedActivities: [],
      price: 25000,
      startTime: 24,
      groupSize: 100,
      selectedVehicle: "",
      features: {
        transfer: false,
        halal: false,
        vegetarian: false,
      },
    });
  };

  const handleFeatureToggle = (feature: keyof typeof filters.features) => {
    setFilters((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature] },
    }));
  };

  const handleActivityToggle = (activityId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedActivities: prev.selectedActivities.includes(activityId)
        ? prev.selectedActivities.filter((id) => id !== activityId)
        : [...prev.selectedActivities, activityId],
    }));
  };

  return (
    <nav className="bg-white  p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src="/Resim1.png"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="text-xl font-bold">Travellers local market</div>
      </div>

      <div className="flex items-center gap-2 ml-auto mr-4">
        <div className="bg-yellow-500 p-2 rounded-full"></div>

        <FaHeart className="text-red-500" />

        <FaShoppingCart className="text-gray-500" />
      </div>

      <button
        onClick={toggleMenu}
        className="bg-orange-500 text-white px-4 py-2 rounded-xl"
      >
        Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md overflow-y-auto max-h-[90vh] relative">
            {!selectedCategory ? (
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg text-center font-bold mb-4">
                  Select a Category
                </h2>
                {["Tours", "Tickets", "Rent", "Transfer"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-orange-500 text-white rounded-xl py-3 px-6 uppercase font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold ">Filter</h2>

                  <button
                    onClick={toggleMenu}
                    className="text-gray-600 bg-gray-100 p-2 rounded-full"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Location</h3>

                    <div className="relative">
                      <input
                        type="text"
                        value={filters.searchLocation}
                        onChange={(e) =>
                          handleInputChange("searchLocation", e.target.value)
                        }
                        placeholder="Where you wanna visit?"
                        className="border rounded-lg p-2 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Theme</h3>

                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() =>
                            handleInputChange("selectedTheme", theme.id)
                          }
                          className={`rounded-full px-3 py-1 text-sm ${
                            filters.selectedTheme === theme.id
                              ? "bg-orange-400 text-black"
                              : "bg-white border border-gray-300 text-black"
                          }`}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Activity</h3>

                      <span className="text-xs text-red-500">
                        Select list (multiple/exactly/exact criteria is
                        possible)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => handleActivityToggle(activity.id)}
                          className={`rounded-full px-4 py-2 text-sm ${
                            filters.selectedActivities.includes(activity.id)
                              ? "bg-orange-400 text-black"
                              : "bg-white border border-gray-300 text-black"
                          }`}
                        >
                          {activity.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Price</h3>

                      <div className="bg-white border rounded-lg px-3 py-1">
                        {filters.price}
                      </div>
                    </div>

                    <div className="px-1 py-2">
                      <div className="relative w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute left-0 top-0 h-1 bg-orange-500 rounded-full"
                          style={{ width: `${(filters.price / 25000) * 100}%` }}
                        ></div>

                        <div
                          className="absolute left-0 top-0 h-1 bg-orange-500 rounded-full"
                          style={{ width: `${(filters.price / 25000) * 100}%` }}
                        ></div>

                        <button
                          className="absolute top-1/2 transform -translate-y-1/2 bg-orange-500 w-6 h-6 rounded-full -ml-3"
                          style={{ left: `${(filters.price / 25000) * 100}%` }}
                          aria-label="Adjust price"
                        ></button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Start time</h3>

                      <div className="flex gap-4">
                        <span className="text-xs">00:00</span>

                        <span className="text-xs">23:59</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="relative w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute left-0 top-0 h-1 bg-orange-500 rounded-full"
                          style={{
                            width: `${(filters.startTime / 24) * 100}%`,
                          }}
                        ></div>

                        <button
                          className="absolute top-1/2 transform -translate-y-1/2 bg-orange-500 w-6 h-6 rounded-full -ml-3"
                          style={{ left: `${(filters.startTime / 24) * 100}%` }}
                          aria-label="Adjust start time"
                        ></button>
                      </div>

                      <div className="bg-white border rounded-lg px-3 py-1 ml-4">
                        {filters.startTime}:00
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Group size</h3>

                      <div className="bg-white border rounded-lg px-3 py-1">
                        {filters.groupSize}
                      </div>
                    </div>

                    <div className="px-1 py-2">
                      <div className="relative w-full h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute left-0 top-0 h-1 bg-orange-500 rounded-full"
                          style={{
                            width: `${(filters.groupSize / 100) * 100}%`,
                          }}
                        ></div>

                        <button
                          className="absolute top-1/2 transform -translate-y-1/2 bg-orange-500 w-6 h-6 rounded-full -ml-3"
                          style={{
                            left: `${(filters.groupSize / 100) * 100}%`,
                          }}
                          aria-label="Adjust group size"
                        ></button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Vehicle</h3>

                    <div className="flex flex-wrap gap-2">
                      {vehicles.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          onClick={() =>
                            handleInputChange("selectedVehicle", vehicle.id)
                          }
                          className={`rounded-full px-4 py-2 text-sm ${
                            filters.selectedVehicle === vehicle.id
                              ? "bg-orange-400 text-black"
                              : "bg-white border border-gray-300 text-black"
                          }`}
                        >
                          {vehicle.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Features</h3>

                    <div className="flex flex-wrap gap-2">
                      {tourFeatures.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() =>
                            handleFeatureToggle(
                              feature.id as keyof typeof filters.features
                            )
                          }
                          className={`rounded-full px-4 py-2 text-sm ${
                            filters.features[
                              feature.id as keyof typeof filters.features
                            ]
                              ? "bg-orange-400 text-black"
                              : "bg-white border border-gray-300 text-black"
                          }`}
                        >
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleReset}
                      className="bg-orange-500 text-white rounded-full py-3 px-6 w-1/2 uppercase font-medium"
                    >
                      Reset
                    </button>

                    <button
                      onClick={applyFilters}
                      className="bg-orange-500 text-white rounded-full py-3 px-6 w-1/2 uppercase font-medium"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
