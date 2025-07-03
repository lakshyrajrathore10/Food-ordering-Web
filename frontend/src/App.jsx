import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import MobileApp from './pages/MobileApp';
import Loginpopup from './components/Loginpopup'; 
import Verify from './pages/Verify.jsx';
import MyOrders from './pages/MyOrders.jsx';
const App = () => {
  const [showLogin, setshowLogin] = useState(false);

  return (
    <>
      {showLogin && <Loginpopup setshowLogin={setshowLogin} />}
      
      <div className='app'>
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/mobile-app' element={<MobileApp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />}></Route>
          <Route path='/MyOrders' element={<MyOrders />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
