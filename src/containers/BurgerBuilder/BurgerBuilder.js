import React, { Component } from 'react'
import { connect } from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/actions'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        console.log('coming from didMount', this.props)
        axios.get('https://react-burger-293ce.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    updatePurchaseState(ingredients) {
        /**
         * transform the objec to an array of the object keys
         * transform the keys array to an array of numbers
         * reduce the numbers array to get the total sum
         * you can use any other method to get the total sum of the array
         */
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseContinueHandler = () => {
       
        this.props.history.push('/checkout')
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    // addIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //     let updatedCount = oldCount + 1;
    //     let updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         totalPrice: newPrice, ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) return
    //     let updatedCount = oldCount - 1;
    //     let updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({
    //         totalPrice: newPrice, ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    render() {
        const disableInfo = {
            ...this.props.ings
        }

        let orderSummary = null

        let burger = <Spinner />
        console.log(this.props.ings)
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        // loop through all the keys in disableInfo
        for (let key in disableInfo) {
            // check if this is zero or less
            disableInfo[key] = disableInfo[key] <= 0
        }
        console.log(disableInfo)
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    // it returns an object which 
    // defines which property holds which state
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    // it returns props that can be triggered
    // ie, dispatchable props
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT, ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))