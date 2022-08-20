import React, {  Fragment, useContext } from 'react'
import mealsImg from '../../Assets/NepaleseFood.jpeg'
import classes from './Header.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../Store/cartContext'


const Header = (props) => {
    
    const cartCtx = useContext(CartContext);

   const numberOfCartItems = cartCtx.items.reduce((curNum, item)=>
   {
       return curNum + item.amount;
   }, 0);
   
   
   

    return <Fragment>
        <header className = {classes.header} >
            <h1> Yana's Nepalese and Desi Food Cafe</h1>
            <button className={classes.button} onClick = {props.onClick}>
                <span className={classes.icon}> <CartIcon/> </span>
                <span> Your Cart </span>
                <span className={classes.badge}> {numberOfCartItems} </span>
            </button>
        </header>
        <div className = {classes['main-image']}>
            <img src = {mealsImg} alt='Nepali Food'/>
        </div>
       
    </Fragment>

}

export default Header