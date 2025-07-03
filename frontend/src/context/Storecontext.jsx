import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const [food_list, setFood_list] = useState([]);
  const [token, setToken] = useState("");
  const url = 'http://localhost:4000';

  // ✅ Add to cart
  const addToCart = async (itemId) => {
    setcartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (itemId) => {
    setcartItem((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (err) {
        console.error("Remove from cart failed:", err);
      }
    }
  };

  // ✅ Get cart from backend
  const getCartFromBackend = async () => {
    try {
      const res = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) {
        setcartItem(res.data.cartData || {});
      }
    } catch (err) {
      console.error("Fetch cart failed:", err);
    }
  };

  // ✅ Total cart amount
  const getTotalCartAmount = () => {
    return food_list.reduce((total, item) => {
      const quantity = cartItem[item._id] || 0;
      return total + (item.price * quantity);
    }, 0);
  };

  // ✅ Total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItem).reduce((total, count) => total + count, 0);
  };

  // ✅ Check if cart has any item
  const hasCartItems = () => {
    return Object.keys(cartItem).length > 0;
  };

  // ✅ Clear cart
  const clearCart = () => {
    setcartItem({});
  };

  // ✅ Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data?.data) {
        setFood_list(response.data.data);
      } else {
        console.warn("Food list format unexpected");
      }
    } catch (error) {
      console.error("Error fetching food list", error);
    }
  };

  // ✅ Initial data load: Food list + token from localStorage
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    }
    loadData();
  }, []);

  // ✅ When token is set, fetch cart data
  useEffect(() => {
    if (token) {
      getCartFromBackend();
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItem,
    addToCart,
    removeFromCart,
    hasCartItems,
    getTotalCartAmount,
    clearCart,
    getTotalCartItems,
    url,
    token,
    setToken
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
