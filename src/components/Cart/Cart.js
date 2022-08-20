import React, {useContext, useState} from 'react';
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from '../../Store/cartContext';
import CartItem from './CartItem';
import Checkout from './Checkout'


const Cart = (props) => {
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const[setSubmitted, setIssubmied] = useState(false)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems =  cartCtx.items.length>0;

  const cartItemAddHandler=(item)=>{cartCtx.addItem({...item, amount:1})}
  const cartItemRemoveHandler=(id)=>{cartCtx.removeItem(id)}

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem 
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  const checkingOutHandler = () => {
    setIsCheckingOut(true)
  }

  const confirmHandler = async (userData) => {
    setIsSubmitting(true)
    const response = await fetch('',{
      method:'POST',
      body:JSON.stringify({user:userData,
      orderedItems:cartCtx.items})
    })

    setIsSubmitting(false);
    setIssubmied(true);
    cartCtx.clearCart();

  }
 //hgvbhjbhj
  const cartModalContent = <React.Fragment> {cartItems}
  <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
  </div>
  {isCheckingOut && <Checkout onClick={props.onClick} onConfirm={confirmHandler}/>}
  {!isCheckingOut && <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClick}>Cancel</button>
      {hasItems && <button className={classes.button} onClick={checkingOutHandler}>Order</button>}
  </div>}</React.Fragment>

  const isSubmittingModalContent = <p>Sending other data..</p>

  const didSubmitModalContent =<p>Successfully sent the order!</p>

  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !setSubmitted && cartModalContent}
      {isSubmitting&& isSubmittingModalContent}
      {setSubmitted && !isSubmitting && didSubmitModalContent }
      </Modal>
  );
};

export default Cart;
