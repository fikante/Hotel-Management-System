import { useState } from "react";
import FoodCard from "./foodCard";
import { foodData } from "@/TestData/FoodData";
import FoodPagination from "./foodPagination";
import FoodToolbar from "./foodToolBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddFood from "@/pages/Food/AddFood";
import OrderedFood from "../Order/OrderedFood";
import EditFood from "@/pages/Food/EditFood";

export const FoodListingView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [orderFoodOpen, setOrderFoodOpen] = useState(false);
  const [editFoodOpen, setEditFoodOpen] = useState(false);
  const [foodItem, setFoodItem] = useState(null);

  const filteredFoods = foodData.filter(
    (food) =>
      food.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.Ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.Status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.Price.toString().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedFoods.map((food) => (
          <FoodCard key={food.id} food={food} 
          onEditClick={() => {
            setEditFoodOpen(true);
            setFoodItem(food);
          }}
          />
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
      <Dialog open={editFoodOpen} onOpenChange={setEditFoodOpen}>
        <DialogContent className="sm:max-w-3xl">
          <EditFood foodItem={foodItem} onSuccess={() => setEditFoodOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
