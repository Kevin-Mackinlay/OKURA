import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { CheckCircleOutline } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: 'Arial', sans-serif;
`;

const Icon = styled(CheckCircleOutline)`
  color: #2e8b57;
  font-size: 80px !important;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #2e8b57;
  margin-bottom: 20px;
  font-size: 36px;
`;

const Details = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  text-align: left;
`;

const Subtitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
`;

const Text = styled.p`
  color: #555;
  margin-bottom: 10px;
  font-size: 18px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  color: #555;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Success = () => {
  const location = useLocation();
  const { stripeData, products } = location.state || {};

  console.log(location);

  return (
    <Container>
      <Icon />
      <Title>Payment Successful!</Title>
      <Details>
        <Subtitle>Order Details</Subtitle>
        <Text>
          <strong>Transaction ID:</strong> {stripeData?.id}
        </Text>
        <Text>
          <strong>Amount:</strong> ${stripeData?.amount / 100}
        </Text>
        <Subtitle>Products:</Subtitle>
        <List>
          {products?.map((product, index) => (
            <ListItem key={index}>
              <strong>{product.title}</strong> - {product.quantity} x ${product.price}
            </ListItem>
          ))}
        </List>
      </Details>
    </Container>
  );
};

export default Success;
