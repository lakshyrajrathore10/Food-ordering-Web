import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
const Add = ({url}) => {
  
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onSubmithandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setimage(false);
      toast.success("Added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Add New Product
      </h1>

      <form
        onSubmit={onSubmithandler}
        className="bg-white rounded-lg shadow-md p-6 md:p-8"
      >
        {/* Image Upload Section */}
        <div className="mb-8">
          <p className="text-lg font-medium text-gray-700 mb-3">
            Upload Product Image
          </p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
              className="w-24 h-24 object-contain mb-3 opacity-70"
            />
            <p className="text-gray-500 text-center">
              Click to browse <br />
              <span className="text-sm text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </span>
            </p>
            <input
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
              type="file"
              className="hidden"
              required
            />
          </label>
        </div>

        {/* Product Info Section */}
        <div className="mb-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Type product name here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Product Description
            </label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="6"
              placeholder="Write detailed description here"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            ></textarea>
          </div>
        </div>

        {/* Category and Price Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Category
            </label>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
            >
              <option value="Salad">Salad</option>
              <option value="rolls">Rolls</option>
              <option value="sandwich">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="Desert">Desert</option>
              <option value="pasta">Pasta</option>
              <option value="pure veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="20.00"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
