export interface RoomType {
  type: "single" | "double" | "suite";
  label: string;
  capacity: number;
  amenities: string[];
  image: string;
}

export interface Room {
  id: string;
  label: string;
  type: "single" | "double" | "suite";
  available: boolean;
}

export interface Residence {
  id: string;
  name: string;
  address: string;
  distance: string; // Distance from venue
  description: string;
  image: string;
  rating: number;
  amenities: string[];
  roomTypes: RoomType[];
  rooms: Room[];
}

export const mockResidences: Residence[] = [
  {
    id: "res-1",
    name: "Résidence Les Palmiers",
    address: "Cocody, Abidjan",
    distance: "2.5 km from conference center",
    description:
      "Modern residence in the heart of Cocody with easy access to the conference venue. Features air-conditioned rooms and complimentary WiFi.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    rating: 4.5,
    amenities: ["WiFi", "Air Conditioning", "Parking", "24/7 Security"],
    roomTypes: [
      {
        type: "single",
        label: "Single Room",
        capacity: 1,
        amenities: ["Single Bed", "Desk", "Wardrobe", "Private Bathroom"],
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
      },
      {
        type: "double",
        label: "Double Room",
        capacity: 2,
        amenities: [
          "Two Single Beds",
          "Desk",
          "Wardrobe",
          "Private Bathroom",
        ],
        image:
          "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=600",
      },
    ],
    rooms: [
      { id: "PA-101", label: "101", type: "single", available: true },
      { id: "PA-102", label: "102", type: "double", available: true },
      { id: "PA-103", label: "103", type: "single", available: false },
      { id: "PA-201", label: "201", type: "double", available: true },
      { id: "PA-202", label: "202", type: "single", available: true },
      { id: "PA-203", label: "203", type: "double", available: false },
    ],
  },
  {
    id: "res-2",
    name: "Résidence Cocody",
    address: "Rue des Jardins, Cocody",
    distance: "1.8 km from conference center",
    description:
      "Comfortable accommodation with modern amenities. Perfect for conference attendees seeking a quiet environment.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    rating: 4.3,
    amenities: ["WiFi", "Air Conditioning", "Breakfast", "Laundry"],
    roomTypes: [
      {
        type: "single",
        label: "Single Room",
        capacity: 1,
        amenities: ["Single Bed", "Desk", "WiFi", "Private Bathroom"],
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
      },
      {
        type: "suite",
        label: "Suite",
        capacity: 2,
        amenities: [
          "Queen Bed",
          "Living Area",
          "Mini Fridge",
          "Private Bathroom",
        ],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
      },
    ],
    rooms: [
      { id: "CO-101", label: "101", type: "single", available: true },
      { id: "CO-102", label: "102", type: "single", available: true },
      { id: "CO-201", label: "201", type: "suite", available: true },
      { id: "CO-202", label: "202", type: "suite", available: false },
      { id: "CO-301", label: "301", type: "single", available: true },
    ],
  },
  {
    id: "res-3",
    name: "Résidence du Lac",
    address: "Près du Lac, Cocody",
    distance: "3.2 km from conference center",
    description:
      "Lakeside residence offering peaceful surroundings and comfortable rooms. Ideal for relaxation after conference sessions.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    rating: 4.7,
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Pool",
      "Restaurant",
      "Lake View",
    ],
    roomTypes: [
      {
        type: "double",
        label: "Double Room",
        capacity: 2,
        amenities: ["Two Single Beds", "Lake View", "Private Bathroom"],
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600",
      },
      {
        type: "suite",
        label: "Lake Suite",
        capacity: 2,
        amenities: [
          "King Bed",
          "Balcony",
          "Lake View",
          "Sitting Area",
          "Mini Bar",
        ],
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600",
      },
    ],
    rooms: [
      { id: "LA-A1", label: "A1", type: "double", available: true },
      { id: "LA-A2", label: "A2", type: "suite", available: true },
      { id: "LA-B1", label: "B1", type: "double", available: false },
      { id: "LA-B2", label: "B2", type: "suite", available: true },
      { id: "LA-C1", label: "C1", type: "double", available: true },
    ],
  },
  {
    id: "res-4",
    name: "Résidence Plateau",
    address: "Le Plateau, Abidjan",
    distance: "4.0 km from conference center",
    description:
      "Central location in the business district. Modern facilities with excellent transport links to the conference venue.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    rating: 4.4,
    amenities: ["WiFi", "Air Conditioning", "Gym", "Business Center"],
    roomTypes: [
      {
        type: "single",
        label: "Single Room",
        capacity: 1,
        amenities: ["Single Bed", "Work Desk", "WiFi", "Private Bathroom"],
        image:
          "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600",
      },
      {
        type: "double",
        label: "Double Room",
        capacity: 2,
        amenities: ["Two Single Beds", "Work Desk", "WiFi", "Private Bathroom"],
        image:
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600",
      },
    ],
    rooms: [
      { id: "PL-01", label: "01", type: "single", available: true },
      { id: "PL-02", label: "02", type: "double", available: true },
      { id: "PL-03", label: "03", type: "single", available: true },
      { id: "PL-04", label: "04", type: "double", available: false },
    ],
  },
];
