import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../context/Storecontext";
import axios from "axios";
import { assets } from "../assets/assets.js";

const MyOrders = () => {
  const { url, token } = useContext(Storecontext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "shipped":
        return "text-blue-600";
      case "processing":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Orders
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            View and track your recent orders
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {data.length === 0 && !loading && !error && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel"
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <span className="text-sm font-semibold text-indigo-600">
                        ${Number(order.amount).toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} × {item.quantity}
                            {idx !== order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <span
                          className={`h-2 w-2 rounded-full ${getStatusColor(
                            order.status
                          ).replace("text", "bg")}`}
                          aria-hidden="true"
                        ></span>
                        <span
                          className={`ml-2 text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">
                        <span>{order.items.length} items</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;