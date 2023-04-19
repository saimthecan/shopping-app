import React from "react";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import HomePage from "./HomePage";





function App() {
  return (
    <div className="app">
      <Navi />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" exact element={<Dashboard />}></Route>
        <Route path="/cart" exact element={<CartDetail />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
