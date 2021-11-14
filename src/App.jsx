import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/apiCall";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import DashboardProduct from "./pages/admin/Product";
import DashboardProductList from "./pages/admin/ProductList";
import DashboardNewProduct from "./pages/admin/NewProduct";
import DashboardUser from "./pages/admin/User";
import DashboardUserList from "./pages/admin/UserList";
import DashboardNewUser from "./pages/admin/NewUser";

// Client pages
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      getUser(dispatch, token);
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Client Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      {/* Admin Routes */}
      <Route path="/dashboard">
        <Route path="" element={<Dashboard />} />
        <Route path="products" element={<DashboardProductList />} />
        <Route path="newproduct" element={<DashboardNewProduct />} />
        <Route path="products/:id" element={<DashboardProduct />} />
        <Route path="users" element={<DashboardUserList />} />
        <Route path="newuser" element={<DashboardNewUser />} />
        <Route path="users/:id" element={<DashboardUser />} />
      </Route>
    </Routes>
  );
};

export default App;
