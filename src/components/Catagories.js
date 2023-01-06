import React from 'react'
import Styled from 'styled-components';
import { mobile } from '../makeResponsive';
import CategoryItem from './CategoryItem';
import winter2 from '../components/winter2.png'
import summer from '../components/summer.PNG'
import auttum from '../components/auttum1.png'


const Container = Styled.div`
    display:flex;
    padding:20px;
    background-color:#fbf0f4;
    justify-content:space-between;
    ${mobile({padding:"0px", flexDirection:"column" })}
`

const Catagories = () => {
  return (
   <Container>
        {[winter2,summer,auttum].map((value,index)=>(
        <CategoryItem value={value} key={index} index={index} />
    ))}
   </Container>
  )
}

export default Catagories