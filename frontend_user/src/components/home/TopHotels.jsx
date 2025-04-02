
import { Button } from "@/components/ui/button";
import HotelCard from "./HotelCard";

const hotels = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Seaside Luxury Resort",
    location: "Malibu, California",
    rating: 4.8,
    price: 299,
    description: "Enjoy breathtaking ocean views from this luxurious beachfront resort with top-notch amenities.",
    discount: 15
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Urban Boutique Hotel",
    location: "New York City, NY",
    rating: 4.6,
    price: 249,
    description: "A modern boutique hotel in the heart of Manhattan, walking distance to major attractions."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Mountain View Lodge",
    location: "Aspen, Colorado",
    rating: 4.9,
    price: 349,
    description: "Nestled in the Rocky Mountains, this lodge offers stunning views and proximity to ski resorts.",
    discount: 10
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Palm Paradise Resort",
    location: "Miami, Florida",
    rating: 4.7,
    price: 279,
    description: "Experience tropical luxury with palm-lined pools and easy access to pristine beaches."
  }
];

const TopHotels = () => {
  return (
    <section id="hotels" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top-Rated Hotels</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved properties with exceptional ratings and reviews from guests around the world.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.id}
              image={hotel.image}
              name={hotel.name}
              location={hotel.location}
              rating={hotel.rating}
              price={hotel.price}
              description={hotel.description}
              discount={hotel.discount}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90">
            View All Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopHotels;
