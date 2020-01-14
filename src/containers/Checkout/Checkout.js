import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
// import * as actions from '../../store/actions/index'

class Checkout extends Component {
    // componentDidMount() {
    //     this.props.onInitPurchase()
    // }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                {/* if this is rendered the other part won't matter */}
                {/* the page will be redirected */}
                {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route
                        path={this.props.match.path + '/'
                            + 'contact-data'} exact
                        component={ContactData} />
                </div>

        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps, /*mapDispatchToProps*/)(Checkout)