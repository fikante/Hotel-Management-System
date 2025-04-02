import { useState } from "react";
import FoodCard from "./foodCard";
import { foodData } from "@/TestData/FoodData";
import FoodPagination from "./foodPagination";
import FoodToolbar from "./foodToolBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddFood from "@/pages/Food/AddFood";
import OrderedFood from "../Order/OrderedFood";

export const FoodCardView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [orderFoodOpen, setOrderFoodOpen] = useState(false);

  const filteredFoods = foodData.filter(
    (food) =>
      food.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.Ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = filteredFoods.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg bg-white">
      <div>
        <FoodToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          buttonText="Add Food"
          onAddClick={() => setAddFoodOpen(true)}
          onOrderClick={() => setOrderFoodOpen(true)}
        />
      </div>
      <div className="flex flex-wrap gap-5">
        {paginatedFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>

      <FoodPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <Dialog open={addFoodOpen} onOpenChange={setAddFoodOpen}>
        <DialogContent className="sm:max-w-3xl">
          <AddFood onSuccess={() => setAddFoodOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={orderFoodOpen} onOpenChange={setOrderFoodOpen}>
        <DialogContent>
          <OrderedFood />
        </DialogContent>
      </Dialog>
    </div>
  );
};
