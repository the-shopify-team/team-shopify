export interface Brand {
  name: string;
  image: string;
}

export const brands: Brand[] = [
  { name: "Toyota", image: "/images/brand/toyota.svg" },
  { name: "Ford", image: "/images/brand/ford.svg" },
  { name: "Tesla", image: "/images/brand/tesla.svg" },
  { name: "Volkswagen", image: "/images/brand/vw.svg" },
  { name: "Honda", image: "/images/brand/honda.svg" },
  { name: "Nissan", image: "/images/brand/nissan.svg" },
  { name: "Chevrolet", image: "/images/brand/chevrolet.svg" },
  { name: "BMW", image: "/images/brand/bmw.svg" },
  { name: "Mercedes-Benz", image: "/images/brand/benz.svg" },
  { name: "Hyundai", image: "/images/brand/hyundai.svg" },
  { name: "Audi", image: "/images/brand/audi.svg" },
  { name: "KIA", image: "/images/brand/kia.svg" },
];


// ...existing code...
type Car = {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  city_mpg: number;
  daily_price: number;
  image: string;
  description?: string;
};

const DUMMY_CARS: Car[] = [
  {
    id: "vw-1",
    manufacturer: "Volkswagen",
    model: "Tiguan",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 28,
    daily_price: 65,
    image: "/images/brands/volkswagen.png",
    description: "Comfortable compact SUV ideal for city and highway driving.",
  },
  {
    id: "mer-1",
    manufacturer: "Mercedes",
    model: "C-Class",
    year: 2021,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 24,
    daily_price: 95,
    image: "/images/brands/mercedes.png",
    description: "Luxury sedan with smooth ride and premium features.",
  },
  {
    id: "por-1",
    manufacturer: "Porsche",
    model: "Macan",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 20,
    daily_price: 180,
    image: "/images/brands/porsche.png",
    description: "Sporty compact SUV with engaging driving dynamics.",
  },
  {
    id: "bmw-1",
    manufacturer: "BMW",
    model: "X3",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 25,
    daily_price: 110,
    image: "/images/brands/bmw.png",
    description: "Balanced performance and utility for everyday use.",
  },
  {
    id: "aud-1",
    manufacturer: "Audi",
    model: "Q5",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 26,
    daily_price: 105,
    image: "/images/brands/audi.png",
    description: "Refined interior and confident handling.",
  },
  {
    id: "toy-1",
    manufacturer: "Toyota",
    model: "RAV4",
    year: 2021,
    transmission: "Automatic",
    fuel: "Hybrid",
    city_mpg: 35,
    daily_price: 70,
    image: "/images/brands/toyota.png",
    description: "Reliable crossover with excellent fuel economy.",
  },
  {
    id: "hon-1",
    manufacturer: "Honda",
    model: "CR-V",
    year: 2021,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 30,
    daily_price: 68,
    image: "/images/brands/honda.png",
    description: "Spacious and practical compact SUV.",
  },
  {
    id: "for-1",
    manufacturer: "Ford",
    model: "Escape",
    year: 2020,
    transmission: "Automatic",
    fuel: "Petrol",
    city_mpg: 27,
    daily_price: 60,
    image: "/images/brands/ford.png",
    description: "A dependable choice for everyday trips.",
  },
];

export const fetchCars = async ({
  manufacturer = "",
  model = "",
}: {
  manufacturer?: string;
  model?: string;
}): Promise<Car[]> => {
  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 150));

  const m = manufacturer.trim().toLowerCase();
  const mo = model.trim().toLowerCase();

  // If both are empty, return all cars
  if (!m && !mo) return DUMMY_CARS;

  // Otherwise filter (partial match)
  return DUMMY_CARS.filter((car) => {
    if (m && !car.manufacturer.toLowerCase().includes(m)) return false;
    if (mo && !car.model.toLowerCase().includes(mo)) return false;
    return true;
  });
};
// ...existing code...