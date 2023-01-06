import Styled from "styled-components";
import Fotter from "../components/Fotter";
import Nav from "../components/Nav";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { FetchingData } from "../SetterAndGetter/SetAndGetSearchitem";

const Container = Styled.div`
   display:flex;
   padding:20px;
   flex-wrap:wrap;
   justify-content:space-between;
`;
const Searchpage = () => {

  let location = useLocation();
  const {Allitem,LoadingState} = FetchingData();
  
  console.log(location.state.data)
  var SearchedItem = Allitem.filter(item=> 
    item.description.toLowerCase().includes(location.state.data||location.state.data.searchbox)
  );
  
  if (LoadingState) {
    return <div>please wait.....</div>;
  }

  return (
    <>
      <Nav />
      <Container>
        {SearchedItem.map((data, index) => (
          <Product image={data.image_link || data.image} key={index} data={data} />
        ))}
      </Container>
      <Fotter />
    </>
  );
};

export default Searchpage;
