import { useEffect, useState } from "react";
import storeApi from "../api/store-api";
import { format } from "timeago.js";
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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await storeApi.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  return (
    <Container>
      <Title>Latest transactions</Title>
      <Table>
        <tr style={{ textAlign: "left" }}>
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
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
      </Table>
    </Container>
  );
}
