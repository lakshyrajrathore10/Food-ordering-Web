import React, { useContext } from 'react';
import { Storecontext } from '../context/Storecontext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);

  const filteredFood = category === "All"
    ? food_list
    : food_list.filter(item => item.category === category);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="relative text-center mb-16">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-400 rounded-full"></div>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl font-serif mb-4">
            {category === "All" ? "Our Culinary Collection" : `${category} Delights`}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative">
            <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-amber-400">✻</span>
            Handcrafted with love and the finest ingredients
            <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-amber-400">✻</span>
          </p>
        </div>

        {/* Food Grid or No Items Message */}
        {filteredFood.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-6 max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-400">
                <svg 
                  className="w-10 h-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 font-serif">No items found</h3>
              <p className="text-gray-500">We couldn't find any dishes in this category. Check back soon!</p>
              <button className="px-6 py-2 border border-amber-400 text-amber-600 hover:bg-amber-50 rounded-full transition duration-200">
                Explore Other Categories
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFood.map((item) => (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>

            {/* CTA Button with decorative elements */}
            {filteredFood.length > 4 && (
              <div className="flex justify-center pt-16 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FoodDisplay;