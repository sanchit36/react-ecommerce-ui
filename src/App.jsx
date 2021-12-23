import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import DashboardProduct from './pages/admin/Product';
import DashboardProductList from './pages/admin/ProductList';
import DashboardNewProduct from './pages/admin/NewProduct';
import DashboardUser from './pages/admin/User';
import DashboardUserList from './pages/admin/UserList';
import OrderList from './pages/admin/OrderList';
import Order from './pages/admin/Order/order.component';

// Client pages
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from 'redux/authReducer';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <ToastContainer
        position='top-right'
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
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path='/success'
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route path='/dashboard'>
          <Route
            path=''
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path='products'
            element={
              <AdminRoute>
                <DashboardProductList />
              </AdminRoute>
            }
          />
          <Route
            path='new-product'
            element={
              <AdminRoute>
                <DashboardNewProduct />
              </AdminRoute>
            }
          />
          <Route
            path='products/:id'
            element={
              <AdminRoute>
                <DashboardProduct />
              </AdminRoute>
            }
          />
          <Route
            path='users'
            element={
              <AdminRoute>
                <DashboardUserList />
              </AdminRoute>
            }
          />
          {/* <Route
            path="new-user"
            element={
              <AdminRoute>
                <DashboardNewUser />
              </AdminRoute>
            }
          /> */}
          <Route
            path='users/:id'
            element={
              <AdminRoute>
                <DashboardUser />
              </AdminRoute>
            }
          />
          <Route
            path='orders'
            element={
              <AdminRoute>
                <OrderList />
              </AdminRoute>
            }
          />
          <Route
            path='orders/:id'
            element={
              <AdminRoute>
                <Order />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
