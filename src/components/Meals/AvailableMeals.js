import React, {useState, useEffect} from 'react';
import Cards from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealsItem/MealItem';


  const AvailableMeals = () => {
    const[meal, setMeal] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[httperror, setError]=useState()

    useEffect(()=>{
      const  fectchData = async()=> {
        const response = await fetch("https://movies-68d6a-default-rtdb.firebaseio.com/movies.json")

        if(!response.ok){
          throw new Error('Something went wrong!')
        }

        const responseData = await response.json()

        const loadedData=[]

        for (const key in responseData)
        {
          loadedData.push({
            id:key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price

          })
        }
        setMeal(loadedData)
        setIsLoading(false)
      }
      fectchData().catch((error)=>{setIsLoading(false);
      setError('Something went wrong!!')})
    },[])


    if(isLoading){
      return(<section className={classes.loadingState}><p> Loading... </p></section>)
      
    }

    if(httperror){
      return(<section className={classes.errorState}>{httperror}</section>)
    }

        const totalMeals = meal.map(meals => <MealItem 
          key={meals.id}
          id={meals.id}
          name={meals.name}
          description={meals.description}
          price={meals.price}/>)

        return (
            <Cards>
            <section className={classes.meals}>
           <ul> {totalMeals} </ul>
           </section>
           </Cards>
        )

  }

   export default AvailableMeals