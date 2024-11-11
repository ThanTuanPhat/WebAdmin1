import "./App.css";
import Login from "./Screen/Login";
import Products from "./Screen/Products";
import AddProduct from "./Navigate/Sidebar";
import InsertProduct from "./Screen/InsertProduct";
import UpdateProduct from "./Screen/UpdateProduct";
import UserManage from "./Screen/UserManage";
import Orders from "./Screen/Orders";
import QLHH from "./Screen/QLHH";
import AddSale from "./Screen/AddSale";
import Charts from "./Screen/Charts";
import NavMenu from "./Navigate/NavMenu";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import React, { useEffect, useState } from "react";

function App() {
  const pathname = window.location.pathname;
  const getAdminFromLocalStorage = () => {
    const adminInfo = localStorage.getItem("admin");
    return adminInfo ? JSON.parse(adminInfo) : null;
  };

  const [admin, setAdmin] = useState(getAdminFromLocalStorage());
  const [isHidden, setIsHidden] = useState(!admin);

  const saveAdminInfo = (adminInfo) => {
    if (!adminInfo) {
      localStorage.removeItem("admin");
      setAdmin(null);
      setIsHidden(true); // Hide NavMenu on logout
    } else {
      localStorage.setItem("admin", JSON.stringify(adminInfo));
      setAdmin(adminInfo);
      setIsHidden(false); // Show NavMenu on login
    }
  };

  const PublicRoute = () => (admin ? <Navigate to="/charts" /> : <Outlet />);
  const PrivateRoute = () => (!admin ? <Navigate to="/login" /> : <Outlet />);

  useEffect(() => {
    // Redirect based on login status at the root route
    if (pathname === "/") {
      if (admin) {
        window.location.href = "/charts";
      } else {
        window.location.href = "/login";
      }
    }
  }, [admin, pathname]);

  return (
    <Router>
      <NavMenu isHidden={isHidden}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login saveAdmin={saveAdminInfo} />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/userManage" element={<UserManage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-Product" element={<AddProduct />} />
            <Route path="/insert-Product" element={<InsertProduct />} />
            <Route path="/update-Product/:id" element={<UpdateProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/QLHH" element={<QLHH />} />
            <Route path="/AddSale" element={<AddSale />} />
            <Route path="/charts" element={<Charts />} />
          </Route>
        </Routes>
      </NavMenu>
    </Router>
  );
}

export default App;
