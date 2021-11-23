import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import DashboardLayout from "../../layout/DashboardLayout";

const Order = (props) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [api] = useAxios();

  useEffect(() => {
    const getOrder = async () => {
      const response = await api.get(`/orders/${id}`);
      console.log(response.data);
      setOrder(response.data);
    };
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return !order ? (
    <h3>Loading...</h3>
  ) : (
    <DashboardLayout>
      <h1>{id}</h1>
    </DashboardLayout>
  );
};

export default Order;
