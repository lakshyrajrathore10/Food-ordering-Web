import React, { useContext } from 'react';
import { Storecontext } from '../context/Storecontext';

const FoodItem = ({ id, name, description, price, image, category, rating }) => {
  const { cartItem, addToCart, removeFromCart , url} = useContext(Storecontext);
  const count = cartItem[id] || 0;

  const handleAdd = () => addToCart(id);
  const increment = () => addToCart(id);
  const decrement = () => removeFromCart(id);

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden h-32">
        <img 
          src={url+"/images/"+image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Ribbon - Smaller */}
        <div className="absolute top-2 right-0 bg-amber-500 text-white text-2xs font-bold px-1.5 py-0.5">
          {category}
          <div className="absolute left-0 bottom-full w-0 h-0 border-l-3 border-l-transparent border-b-3 border-b-amber-700"></div>
        </div>

        {/* Rating - Smaller */}
        {rating && (
          <div className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded-full flex items-center shadow-xs">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-2 h-2 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">{name}</h3>
        <p className="text-gray-600 text-2xs mb-2 line-clamp-2">{description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-bold text-amber-600">${price.toFixed(2)}</span>
          
          {count === 0 ? (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-amber-500 text-white text-2xs font-medium rounded-full hover:bg-amber-600 transition-colors flex items-center"
            >
              <svg className="w-2 h-2 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1 border border-amber-500 px-4 py-2 rounded-full">
              <button onClick={decrement} className="text-amber-500 font-bold text-sm">-</button>
              <span className="text-2xs">{count}</span>
              <button onClick={increment} className="text-amber-500 font-bold text-sm">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;