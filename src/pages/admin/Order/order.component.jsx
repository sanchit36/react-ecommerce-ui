import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import DashboardLayout from '../../../layout/DashboardLayout';
import { Card } from './order.styles';
import {
  Container,
  TitleContainer,
  RightContainer,
  LeftContainer,
  Wrapper,
} from './order.styles';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [api] = useAxios();

  useEffect(() => {
    const getOrder = async () => {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    };
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return !order ? (
    <h3>Loading...</h3>
  ) : (
    <DashboardLayout>
      <Container>
        <TitleContainer>
          <h1>Order</h1>
          <h3>{id}</h3>
        </TitleContainer>

        <Wrapper>
          <LeftContainer>
            <Card>
              <div>
                <h2>About Order</h2>
                <br />
                <div style={{ marginBottom: '20px' }}>
                  <strong>ID:</strong> <p>{order._id}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <strong>Amount: </strong> <p>{order.amount}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <strong>Status:</strong> <p>{order.status}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h3>Billing Address:</h3>
                  <br />
                  <strong>City:</strong> <p>{order.address.city}</p>
                  <strong>Country:</strong> <p>{order.address.country}</p>
                  <strong>address:</strong> <p>{order.address.line1}</p>
                  <strong>Postal code:</strong>
                  <p>{order.address.postal_code}</p>
                  <strong>State:</strong>
                  <p>{order.address.state}</p>
                </div>
              </div>
              <div>
                <h2>About User</h2>
                <br />
                <div style={{ marginBottom: '20px' }}>
                  <strong>USER ID:</strong> <p>{order.user.id}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <strong>username: </strong> <p>{order.user.username}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <strong>Email:</strong> <p>{order.user.email}</p>
                </div>
              </div>
            </Card>
          </LeftContainer>
          <RightContainer></RightContainer>
        </Wrapper>
      </Container>
    </DashboardLayout>
  );
};

export default Order;
