import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/apiCall";
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

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null && !currentUser) {
      getUser(dispatch, token);
    }
  }, [dispatch, currentUser]);

  return (
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
            path="newproduct"
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
            path="newuser"
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
        </Route>
      </Routes>
    </>
  );
};

export default App;
