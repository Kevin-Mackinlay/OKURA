import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
// import { mobile } from '../responsive';
const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 90%;
  height: 90vh;
  object-fit: cover;
 
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;

`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;


const Product = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://images.pexels.com/photos/6765178/pexels-photo-6765178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </ImgContainer>
        <InfoContainer>
          <Title>Jean Jacket</Title>
          <Desc>This classic jean jacket combines timeless style with modern flair. Crafted from premium denim, it features a versatile light wash, perfect for pairing with both casual and dressy outfits. The jacket boasts traditional details such as flap pockets, button closures, and adjustable waist tabs, allowing for a customizable fit. Durable and designed to age beautifully, this jean jacket is an essential piece for any wardrobe, offering endless styling possibilities.</Desc>
          <Price>$ 30</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
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
