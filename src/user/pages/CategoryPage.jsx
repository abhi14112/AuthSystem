import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import axios from "../../utils/axiosInstance";
import Deals from "../components/Deals";
const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    let response = await axios.get("/api/category/all");
    let data = response.data;
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <h1 className="text-3xl px-16  text-slate-800 font-bold mb-3">
        Explore Our Top Categories
      </h1>
      <div className="bg-white text-black py-6 flex items-center flex-col gap-4 ">
        <div className="flex flex-wrap justify-center gap-16">
          {categories.map((item, index) => (
            <CategoryItem key={index} item={item} />
          ))}
        </div>
      </div>
      <h1 className="bg-white text-slate-800 px-8 text-3xl font-bold">
        Best Deals For You
      </h1>
      <Deals />
    </>
  );
};
export default CategoryPage;
