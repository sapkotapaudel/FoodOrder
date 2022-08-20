import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name:true,
        street: true,
        city: true,
        postalCode: true
    })
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = (value) => value.trim().length ==='';
    const fiveChar = (value) => value.trim().length !== 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName)
    const streetIsValid = !isEmpty(enteredStreet)
    const cityIsValid = !isEmpty(enteredCity)
    const codeIsValid = !fiveChar(enteredPostal)

    setFormInputsValidity({name:nameIsValid,
    street:streetIsValid,
    city:cityIsValid,
    postalCode: codeIsValid})
    const formIsValid = nameIsValid && streetIsValid && cityIsValid &&  codeIsValid;

     if(!formIsValid)
  {
      return;
  }

     props.onConfirm({
         name:enteredName,
         city:enteredCity,
         code: enteredPostal,
         street:enteredCity
     });
  };

  const nameControlClasses =`${classes.control} ${formInputsValidity.name ? '': classes.invalid}`
  const streetControlClasses =`${classes.control} ${formInputsValidity.street ? '': classes.invalid}`
  const postalControlClasses =`${classes.control} ${formInputsValidity.postalCode ? '': classes.invalid}`
  const cityControlClasses =`${classes.control} ${formInputsValidity.city ? '': classes.invalid}`
  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef }/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;