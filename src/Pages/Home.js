import React from 'react'
import Nav from '../components/Nav'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Catagories from '../components/Catagories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Fotter from '../components/Fotter'
import HorizontalScroll from '../components/HorizontalScroll'
import { useLocation } from 'react-router-dom'

const Home = () => {
 const location = useLocation();
 if(location.state){
  console.log(location.state.token);
 }
 
  return (
   <div>
        <Announcement/>
       <Nav/>
       <Slider/> 
       <Catagories/>
       <HorizontalScroll/>
       <Products  />
       <Newsletter/>
       <Fotter/>
       
   </div>
  )
}

export {Home}