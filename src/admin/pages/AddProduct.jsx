import { ArrowLeft } from "lucide-react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AddProduct = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: "",
    categoryModelId: "",
  });
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    image: "",
    category: "",
    imageFile: null,
  });
  const handleCategoryChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const categoryName = selectedOption.value;
    const categoryModelId = selectedOption.getAttribute("data-id");
    setSelectedCategory({ categoryName, categoryModelId });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleFileChange = (e) => {
    setProductData({ ...productData, imageFile: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCategory);
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("image", productData.image);
    formData.append("imageFile", productData.imageFile);
    formData.append("category", selectedCategory.categoryName);
    formData.append("categoryModelId", selectedCategory.categoryModelId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7249/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Product added successfully!");
      setProductData({
        productName: "",
        description: "",
        price: "",
        image: "",
        category: "",
        imageFile: null,
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };
  const fetchCategories = async () => {
    var result = await axiosInstance.get("/api/category/all");
    var data = result.data;
    console.log(data);
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex gap-4 py-4 justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                onChange={handleCategoryChange}
                id="category"
                name="category"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.categoryModelId}
                    value={category.categoryName}
                    data-id={category.categoryModelId}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        </div>
        <div
          onClick={() => navigate("/admin/products")}
          className=" flex h-max border border-black px-3 py-1.5 rounded-md cursor-pointer text-black  "
        >
          <ArrowLeft />
          <p>Go Back</p>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
