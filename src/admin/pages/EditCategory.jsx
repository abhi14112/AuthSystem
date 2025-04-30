import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
const EditCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const [categoryData, setCategoryData] = useState({
    categoryModelId: location.state.categoryModelId,
    categoryName: location.state.categoryName,
    categoryImage: location.state.categoryImage,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/category", categoryData);
      toast.success("Category Updated Successfully");
      setCategoryData({
        categoryName: "",
        categoryImge: "",
      });
      navigate("/admin/categories");
    } catch (error) {
      toast.error("Failed to Update category");
    }
  };
  return (
    <>
      <div className=" bg-white flex gap-4 py-4 justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Update Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={categoryData.categoryName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Category Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categoryImage"
                className="block text-sm font-medium text-gray-700"
              >
                Category Image
              </label>
              <input
                type="text"
                id="categoryImage"
                name="categoryImage"
                value={categoryData.categoryImage}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Image Url"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update
            </button>
          </form>
        </div>
        <div
          onClick={() => navigate("/admin/categories")}
          className=" flex h-max border border-black px-3 py-1.5 rounded-md cursor-pointer text-black  "
        >
          <ArrowLeft />
          <p>Go Back</p>
        </div>
      </div>
    </>
  );
};
export default EditCategory;
