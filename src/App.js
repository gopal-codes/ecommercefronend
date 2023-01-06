import React from "react";
import {BrowserRouter as Router,Route ,Switch } from "react-router-dom";
import {Home} from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ProductList from "./Pages/ProductList";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./components/Cart";
import SellProduct from './Pages/SellProduct'
import { CartProvider } from "react-use-cart";
import Latest from "./Pages/Latest";
import Searchpage from "./Pages/Searchpage";

function App() {

  return (
  <CartProvider> 
    <div className="App">
      <Router>
         <Switch>
          <Route exact path="/">
         <Home/>  
          </Route>
          <Route path="/singleProduct" > <SingleProduct /> </Route>
          <Route path="/productlist"> <ProductList /> </Route>
          <Route path="/register"> <Register /> </Route>
          <Route path="/login"> <Login /> </Route>
          <Route path="/cart"> <Cart /> </Route>
          <Route path="/latest"> <Latest /> </Route>
          <Route path="/sellproduct"><SellProduct /> </Route>
          <Route path="/Searchpage"><Searchpage /> </Route>
         </Switch>
     </Router>
    </div>
    </CartProvider> 
  );
}

export default App ;
