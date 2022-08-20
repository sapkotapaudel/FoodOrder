import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React, {useState} from "react";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";


function App() {
  const [cartShown, setCartShown] = useState(false)

  const showCartHandler = () => {
    setCartShown(true)
  }

  const hideCarthandler = () => {
    setCartShown(false)
  }

  return (
    <CartProvider>
      {cartShown && <Cart onClick = {hideCarthandler}/>}
    <Header onClick={showCartHandler}/>
    <Meals/>
    </CartProvider>
  );
}

export default App;
