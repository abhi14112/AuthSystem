import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CategoryItem = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={() => {
          
          navigate("/shop/products", {
            state: { category: item.categoryName },
          });
        }}
        className=" hover:cursor-pointer rounded-full h-[180px] w-[180px]   transition-all relative duration-400 hover:scale-103 "
      >
        <img
          src={item.categoryImage}
          className="object-cover h-full w-full rounded-full"
        />
      </div>
      <p className="text-slate-800 text-md">{item.categoryName}</p>
    </div>
  );
};

export default CategoryItem;
