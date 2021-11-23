import { useEffect, useState } from "react";

import { format } from "timeago.js";
import useAxios from "../hooks/useAxios";
import {
  Container,
  Table,
  Title,
  Button as ButtonStyle,
  Username,
} from "../styles/Widget";

const Button = ({ type }) => {
  return <ButtonStyle type={type}>{type}</ButtonStyle>;
};

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [api] = useAxios();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get("orders");
        setOrders(res.data.orders);
      } catch {}
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Title>Latest transactions</Title>
      <Table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ textAlign: "left" }}>
              <td>
                <Username>{order.user}</Username>
              </td>
              <td>{format(order.createdAt)}</td>
              <td>$ {order.amount}</td>
              <td>
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
