import React, {Fragment} from 'react';
import AvailableMeals from './AvailableMeals';
import classes from './Meals.module.css'

const Meals = () => {

    return(
        <Fragment>
            <div className={classes.summary}>Not a fast food, but we offer hygenic and tastier food faster 
                than the fastest fast food at your door steps!</div>
            <AvailableMeals/>
        </Fragment>
    )

}

export default Meals