import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { Search, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Categoreis = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    let response = await axios.get("/api/category/all");
    var data = response.data;
    setCategories(data);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/category/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Cannot Delete this category because it has products");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="pt-4 pb-16 px-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold text-violet-500">
            Categoreis ({categories.length})
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex px-2 py-1 gap-2 items-center border-2 border-violet-500 rounded-sm">
              <Search className="text-violet-500" size={18} />
              <input
                className="outline-none"
                type="text"
                placeholder="Gadgets"
              />
            </div>
            <div>
              <button
                onClick={() => navigate("/admin/addCategory")}
                className="text-white bg-black rounded-sm  py-1.5 px-2"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
        <div>
          <table className="flex flex-col gap-4">
            <thead>
              <tr className="flex justify-between">
                <td>Image</td>
                <td className="w-[50%]">Title</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-2">
              {categories.map((category, index) => {
                return (
                  <tr className="flex gap-4 justify-between w-full" key={index}>
                    <td className="">
                      <img
                        className="w-12 h-16 rounded-md object-cover"
                        src={category.categoryImage}
                      />
                    </td>
                    <td className="w-[50%]">{category.categoryName}</td>
                    <td>
                      <div className="relative inline-block w-11 h-5">
                        <input
                          id={category.id}
                          type="checkbox"
                          className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                        />
                        <label
                          htmlFor={category.id}
                          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                        ></label>
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <SquarePen
                        className="cursor-pointer"
                        onClick={() =>
                          navigate("/admin/editCategory", {
                            state: category,
                          })
                        }
                        color="blue"
                      />
                      <Trash2
                        className="cursor-pointer"
                        onClick={() => handleDelete(category.categoryModelId)}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Categoreis;
