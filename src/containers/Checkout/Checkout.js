import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients, totalPrice: price })
    }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                <Route
                    path={this.props.match.path + '/'
                        + 'contact-data'} exact
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...this.props}/>
                    )} />
            </div>
        )
    }
}

export default Checkout