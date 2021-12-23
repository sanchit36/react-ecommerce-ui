import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setUser } from '../redux/authReducer';
import axios from 'axios';

axios.defaults.withCredentials = true;
const useAxios = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    async function (config) {
      if (!token) {
        return config;
      }

      const { exp } = jwt_decode(token);
      const isExpired = Date.now() > exp;

      if (!isExpired) return config;

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/refresh_token`,
        {
          withCredentials: true,
        }
      );

      dispatch(
        setUser({
          token: response.data.accessToken,
          user: response.data.user,
        })
      );

      config.headers.Authorization = 'Bearer ' + response.data.accessToken;
      return config;
    },
    function (err) {
      console.error(err);
      return err;
    }
  );

  return [api];
};

export default useAxios;
