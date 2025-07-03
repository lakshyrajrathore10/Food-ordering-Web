import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url + "/api/order/list");
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus
      });
      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
    }
  };

  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Management</h3>
        <div className="bg-white rounded-lg shadow p-8">
          <img src={assets.parcel_icon} alt="No orders" className="w-24 h-24 mx-auto mb-4 opacity-50" />
          <p className="text-gray-600 text-lg">No orders found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h3>
        <button 
          onClick={fetchAllOrders}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-center p-3 bg-indigo-50 rounded-lg md:w-16 md:h-16">
              <img src={assets.parcel_icon} alt="Parcel" className="w-10 h-10 text-indigo-600" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-500">ORDER #{order._id.slice(-6).toUpperCase()}</h4>
                <p className="text-sm font-medium text-gray-900">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} × {item.quantity}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.address.street}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{order.address.phone}</p>
                  <p className="text-xs text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end gap-3">
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {order.items.length} {order.items.length > 1 ? 'items' : 'item'}
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  ${order.amount.toFixed(2)}
                </span>
              </div>
              
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full md:w-auto"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'Out for delivery' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;