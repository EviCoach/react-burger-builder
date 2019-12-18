import React from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientsKey => {
            return [
                // return an array with length equivalent
                // to the number of ingredients for this key
                ...Array(props.ingredients[ingredientsKey])
            ].map((_, index) => {
                return <BurgerIngredient key={ingredientsKey + index}
                    type={ingredientsKey} />
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    console.log(transformedIngredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger