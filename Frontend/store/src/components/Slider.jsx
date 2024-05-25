import { ArrowLeftOutlined, ArrowRightAltOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #5f9ea0;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.5s ease;
`; 

const Slider = () => {
  return (
   <Container>
<Arrow>
    <ArrowLeftOutlined />
</Arrow>
<Arrow>
    <ArrowRightOutlined />
</Arrow>
   </Container>
  )
}

export default Slider