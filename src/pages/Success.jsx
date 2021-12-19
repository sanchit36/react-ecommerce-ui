import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const orderId = location.state.orderId;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <Link to="/" style={{ padding: 10, marginTop: 20 }}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default Success;
