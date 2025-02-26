// src/data/index.ts

export interface Theme {
  id: string;
  name: string;
  count: number;
}

export interface Activity {
  id: string;
  name: string;
  count: number;
}

export interface Vehicle {
  id: string;
  name: string;
  count: number;
}

export interface Feature {
  id: string;
  name: string;
  count: number;
}

export interface Tour {
  id: string;
  name: string;
  location: string;
  price: number;
  startTime: number;
  groupSize: number;
  themes: string[];
  activities: string[];
  vehicles: string[];
  features: string[];
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
}

// Filter Options
export const themes: Theme[] = [
  { id: "island-tour", name: "Island Tour", count: 43 },
  { id: "land-tour", name: "Land Tour", count: 43 },
  { id: "safari", name: "Safari", count: 43 },
];

export const activities: Activity[] = [
  { id: "swimming", name: "Swimming", count: 43 },
  { id: "running", name: "Running", count: 43 },
  { id: "elephant-care", name: "Elephant care", count: 43 },
  { id: "snorkeling", name: "Snorkeling", count: 43 },
];

export const vehicles: Vehicle[] = [
  { id: "yacht", name: "Yacht", count: 43 },
  { id: "speedboat", name: "Speedboat", count: 43 },
  { id: "safari", name: "Safari", count: 43 },
  { id: "catamaran", name: "Catamaran", count: 43 },
  { id: "speedcatamaran", name: "Speedcatamaran", count: 43 },
];

export const features: Feature[] = [
  { id: "transfer", name: "Transfer", count: 43 },
  { id: "halal", name: "Halal Food", count: 43 },
  { id: "vegetarian", name: "Vegetarian food", count: 43 },
];

// Örnek Tur Verileri
export const tours: Tour[] = [
  {
    id: "tour-1",
    name: "Phi Phi Island Adventure",
    location: "Phi Phi Island",
    price: 12500,
    startTime: 9,
    groupSize: 15,
    themes: ["island-tour"],
    activities: ["swimming", "snorkeling"],
    vehicles: ["speedboat"],
    features: ["transfer", "vegetarian"],
    image: "/1.jpg",
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "tour-2",
    name: "Elephant Sanctuary Experience",
    location: "Chalong",
    price: 9500,
    startTime: 7,
    groupSize: 12,
    themes: ["land-tour"],
    activities: ["elephant-care"],
    vehicles: ["safari"],
    features: ["transfer", "halal", "vegetarian"],
    image: "/2.jpg",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "tour-3",
    name: "Luxury Yacht Sunset Tour",
    location: "Patong Bay",
    price: 18000,
    startTime: 16,
    groupSize: 8,
    themes: ["island-tour"],
    activities: ["swimming"],
    vehicles: ["yacht"],
    features: ["transfer", "halal"],
    image: "/3.jpg",
    rating: 4.7,
    reviewCount: 178,
  },
  {
    id: "tour-4",
    name: "Catamaran Island Hopping",
    location: "Koh Racha",
    price: 14500,
    startTime: 8,
    groupSize: 20,
    themes: ["island-tour"],
    activities: ["swimming", "snorkeling"],
    vehicles: ["catamaran"],
    features: ["transfer", "vegetarian"],
    image: "/4.jpg",
    rating: 4.6,
    reviewCount: 203,
  },
  {
    id: "tour-5",
    name: "Safari Adventure Park",
    location: "Khao Sok National Park",
    price: 11000,
    startTime: 8,
    groupSize: 25,
    themes: ["safari"],
    activities: ["elephant-care", "running"],
    vehicles: ["safari"],
    features: ["transfer", "halal", "vegetarian"],
    image: "/5.jpg",
    rating: 4.5,
    reviewCount: 189,
  },
  {
    id: "tour-6",
    name: "Maya Bay Snorkeling Tour",
    location: "Maya Bay",
    price: 13500,
    startTime: 10,
    groupSize: 18,
    themes: ["island-tour"],
    activities: ["swimming", "snorkeling"],
    vehicles: ["speedboat"],
    features: ["transfer", "vegetarian"],
    image: "/6.jpg",
    rating: 4.8,
    reviewCount: 220,
  },
  {
    id: "tour-7",
    name: "Jungle Trekking & Waterfall",
    location: "Khao Sok National Park",
    price: 8500,
    startTime: 7,
    groupSize: 10,
    themes: ["land-tour"],
    activities: ["hiking", "swimming"],
    vehicles: ["safari"],
    features: ["transfer", "halal"],
    image: "/7.jpg",
    rating: 4.7,
    reviewCount: 198,
  },
  {
    id: "tour-8",
    name: "Night Kayaking & Firefly Watching",
    location: "Phang Nga Bay",
    price: 9200,
    startTime: 19,
    groupSize: 6,
    themes: ["water-tour"],
    activities: ["kayaking"],
    vehicles: ["canoe"],
    features: ["transfer"],
    image: "/8.jpg",
    rating: 4.9,
    reviewCount: 140,
  },
];

// Filtre Uygulanmış Turları Döndüren Fonksiyon
export const getFilteredTours = (
  searchLocation: string = "",
  selectedTheme: string = "",
  selectedActivities: string[] = [],
  priceRange: number = 25000,
  startTimeRange: number = 24,
  groupSizeRange: number = 100,
  selectedVehicle: string = "",
  selectedFeatures: string[] = []
): Tour[] => {
  return tours.filter((tour) => {
    // Lokasyon filtreleme
    if (
      searchLocation &&
      !tour.location.toLowerCase().includes(searchLocation.toLowerCase())
    ) {
      return false;
    }

    // Tema filtreleme
    if (selectedTheme && !tour.themes.includes(selectedTheme)) {
      return false;
    }

    // Aktivite filtreleme
    if (
      selectedActivities.length > 0 &&
      !selectedActivities.some((act) => tour.activities.includes(act))
    ) {
      return false;
    }

    // Fiyat filtreleme
    if (tour.price > priceRange) {
      return false;
    }

    // Başlangıç saati filtreleme
    if (tour.startTime > startTimeRange) {
      return false;
    }

    // Grup büyüklüğü filtreleme
    if (tour.groupSize > groupSizeRange) {
      return false;
    }

    // Araç filtreleme
    if (selectedVehicle && !tour.vehicles.includes(selectedVehicle)) {
      return false;
    }

    // Özellik filtreleme
    if (
      selectedFeatures.length > 0 &&
      !selectedFeatures.every((feat) => tour.features.includes(feat))
    ) {
      return false;
    }

    return true;
  });
};
