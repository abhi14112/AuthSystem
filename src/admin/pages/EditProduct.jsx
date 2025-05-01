import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EditProduct = () => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: product.category,
    categoryModelId: "", // Will be filled after fetching categories
  });

  const [productData, setProductData] = useState({
    productName: product.productName,
    description: product.description,
    price: product.price,
    image: product.image,
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, imageFile: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const categoryName = selectedOption.value;
    const categoryModelId = selectedOption.getAttribute("data-id");
    setSelectedCategory({ categoryName, categoryModelId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("image", productData.image); // optional - current image
    formData.append("imageFile", productData.imageFile); // new image file
    formData.append("category", selectedCategory.categoryName);
    formData.append("categoryModelId", selectedCategory.categoryModelId);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://localhost:7249/api/product/update/${product.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await axiosInstance.get("/api/category/all");
      const data = result.data;
      setCategories(data);

      // Preselect the category ID based on name
      const matchedCategory = data.find(
        (cat) => cat.categoryName === product.category,
      );
      if (matchedCategory) {
        setSelectedCategory({
          categoryName: matchedCategory.categoryName,
          categoryModelId: matchedCategory.categoryModelId,
        });
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex gap-4 py-4 justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Update Product
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
              value={selectedCategory.categoryName}
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
            Update
          </button>
        </form>
      </div>
      <div
        onClick={() => navigate("/admin/products")}
        className="flex h-max border border-black px-3 py-1.5 rounded-md cursor-pointer text-black"
      >
        <ArrowLeft />
        <p>Go Back</p>
      </div>
    </div>
  );
};

export default EditProduct;
