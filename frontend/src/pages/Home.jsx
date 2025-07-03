import React, { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <div id="home">
      <Header />
      <ExploreMenu category={category} setCategory={setcategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
