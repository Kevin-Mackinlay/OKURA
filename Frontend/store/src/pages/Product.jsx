import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.span`
  font-size: 24px;
  margin: 0 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  border: none;
  font-size: 16px;
`;

// ... other styled components remain unchanged ...

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt={product.name} />
        </ImgContainer>
        <InfoContainer>
          // ... other elements remain unchanged ...
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
