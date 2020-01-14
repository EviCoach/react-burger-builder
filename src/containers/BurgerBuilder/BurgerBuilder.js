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
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log('coming from didMount', this.props)
        this.props.onInitIngredients()
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
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    // it returns props that can be triggered
    // ie, dispatchable props
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))