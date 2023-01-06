import React from 'react'
import Styled from 'styled-components';



const Container = Styled.div`
    height:350px;
    min-width:280px;
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px;
    background-color:#eee;
    position:relative;
    overflow:hidden;
 
`;

const Image = Styled.img`
    height:262.5px;
    width:95%;
    
`;

const Panal=Styled.div`
    height:100%;
    width:100%;
    background:transparent;
    position:absolute;
    animation-name: move;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
   
@keyframes move {
    0%{
        transform: translateX(-7vw);
    }
    100%{
        transform: translateX(100%) ;
    }
}

`;
const Panalslide = Styled.div`
    height:125%;
    width:10%;
    transform: skewX(-30deg);
    background:#fff;
   
    
`


const Productskeleton = ({value}) => {
   
  return (
   <Container key={value} >
       
       <Image  />
       <Panal>
       <Panalslide />
       </Panal>
      
   </Container>
  )
}

export default Productskeleton