import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import MyCart from './Components/MyCart.jsx';
import Shop from './Components/Shop.jsx';
import Logout from './Components/Logout.jsx';
import './Styles/Logout.css';
import './Styles/Shop.css';
import './Styles/MyCart.css';
import './Styles/Register.css';
import './Styles/Login.css';
import './Styles/Navbar.css';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </div>
  );
}

export default App;


