import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import AdminRoute from "./routes/AdminRoute";
import OrderList from "./pages/admin/OrderList";
import { useEffect, useState } from "react";
import { setUser } from "./redux/authReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
axios.defaults.withCredentials = true;

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/refresh_token`
      );
      setLoading(false);
      dispatch(
        setUser({
          token: response.data.accessToken,
          user: response.data.user,
        })
      );
    };
    getToken();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
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
        <Route path="/product/:slug" element={<Product />} />
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
          <Route
            path=""
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="products"
            element={
              <AdminRoute>
                <DashboardProductList />
              </AdminRoute>
            }
          />
          <Route
            path="new-product"
            element={
              <AdminRoute>
                <DashboardNewProduct />
              </AdminRoute>
            }
          />
          <Route
            path="products/:id"
            element={
              <AdminRoute>
                <DashboardProduct />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <DashboardUserList />
              </AdminRoute>
            }
          />
          <Route
            path="new-user"
            element={
              <AdminRoute>
                <DashboardNewUser />
              </AdminRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <AdminRoute>
                <DashboardUser />
              </AdminRoute>
            }
          />
          <Route
            path="orders"
            element={
              <AdminRoute>
                <OrderList />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
