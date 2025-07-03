import React, { useContext } from 'react';
import { Storecontext } from '../context/Storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, removeFromCart, hasCartItems, getTotalCartAmount, food_list, url } = useContext(Storecontext);
  const navigate = useNavigate();

  if (!hasCartItems()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Your Shopping Cart</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 p-4 font-medium text-gray-600">
          <div className="col-span-5 md:col-span-4">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Total</div>
          <div className="col-span-1 text-center">Action</div>
        </div>
        
        {food_list.map((item) => {
          const quantity = cartItem[item._id];
          if (quantity > 0) {
            return (
              <div key={item._id} className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 border-b border-gray-200 items-center hover:bg-gray-50 transition">
                <div className="col-span-3 sm:col-span-4 flex items-center space-x-2 sm:space-x-4">
                  <img 
                    src={`${url}/images/${item.image}`} 
                    alt={item.name} 
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                  />
                  <p className="font-medium text-sm sm:text-base text-gray-800 line-clamp-1">{item.name}</p>
                </div>
                
                <div className="col-span-1 sm:hidden text-right text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </div>
                
                <div className="hidden sm:block sm:col-span-2 text-center text-gray-600">
                  ${item.price.toFixed(2)}
                </div>
                
                <div className="col-span-2 sm:col-span-2 text-center">
                  <span className="inline-block px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-sm sm:text-base">
                    {quantity}
                  </span>
                </div>
                
                <div className="hidden sm:block sm:col-span-2 text-center font-medium">
                  ${(item.price * quantity).toFixed(2)}
                </div>
                
                <div className="col-span-1 text-center">
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="p-1 sm:p-2 text-red-500 hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="col-span-6 sm:hidden pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="text-sm font-medium">${(item.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        <div className="lg:w-1/3 order-2 lg:order-1">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Cart Summary</h2>
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-between">
                <p className="text-sm sm:text-base text-gray-600">Subtotal</p>
                <p className="text-sm sm:text-base font-medium">${subtotal.toFixed(2)}</p>
              </div>
              
              {hasCartItems() && (
                <>
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-base text-gray-600">Delivery Fee</p>
                    <p className={`text-sm sm:text-base font-medium ${deliveryFee === 0 ? 'text-green-500' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </p>
                  </div>
                  {subtotal > 50 && (
                    <p className="text-xs sm:text-sm text-green-500">🎉 Congrats! You've qualified for free shipping</p>
                  )}
                </>
              )}
              
              <hr className="my-1 sm:my-2" />
              <div className="flex justify-between">
                <p className="text-base sm:text-lg font-bold text-gray-800">Total</p>
                <p className="text-base sm:text-lg font-bold text-orange-700">${total.toFixed(2)}</p>
              </div>
            </div>
            
            <button
             onClick={()=> navigate('/order')} 
             className="w-full py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
              Proceed To Checkout
            </button>
          </div>
        </div>

        <div className="lg:w-2/3 order-1 lg:order-2">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Promo Code</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">If you have a promo code, enter it here:</p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Enter promo code" 
                className="flex-grow px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 sm:px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition duration-300 whitespace-nowrap text-sm sm:text-base">
                Apply Code
              </button>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Available Offers</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-sm sm:text-base">✓</span>
                  <span className="text-gray-600 text-sm sm:text-base">Free delivery for orders over $50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
