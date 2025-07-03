import React, { useState, useContext } from 'react';
import { Storecontext } from '../context/Storecontext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, hasCartItems, clearCart, cartItem, url, token, food_list } = useContext(Storecontext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = getTotalCartAmount();
  const deliveryFee = hasCartItems() ? (subtotal > 50 ? 0 : 5.99) : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderItems = [];
      food_list.forEach((item) => {
        if (cartItem[item._id] > 0) {
          const itemInfo = { ...item, quantity: cartItem[item._id] };
          orderItems.push(itemInfo);
        }
      });

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + deliveryFee,
      };

      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Delivery Information */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Delivery Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input type="text" name="street" placeholder="123 Main St" value={formData.street} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" name="city" placeholder="New York" value={formData.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input type="text" name="state" placeholder="NY" value={formData.state} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                <input type="text" name="zip" placeholder="10001" value={formData.zip} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" name="country" placeholder="United States" value={formData.country} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {hasCartItems() && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                          {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                      {subtotal > 50 && (
                        <div className="bg-green-50 text-green-700 text-sm p-2 rounded-lg flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Congrats! You've qualified for free shipping
                        </div>
                      )}
                    </>
                  )}

                  <div className="border-t border-gray-200 my-2"></div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition-colors
                    ${isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}
                    flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Proceed To Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
