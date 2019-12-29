import React, { Component } from 'react'
import axios from 'axios'

import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    formConstruct = (elementType, inputType, placeholder) => {
        return {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: placeholder
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            shouldValidate: true,
            touched: false
        }
    }

    state = {
        orderForm: {
            name: this.formConstruct('input', 'text', 'Your Name'),
            street: this.formConstruct('input', 'text', 'Street'),
            zipCode: this.formConstruct('input', 'text', 'ZIP CODE'),
            country: this.formConstruct('input', 'text', 'Country'),
            email: this.formConstruct('input', 'email', 'Your e-mail'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'choose one', displayValue: 'Delivery Method' },
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },

                    ],
                    placeholder: 'Choose One',
                },
                validation: { required: true },
                shouldValidate: false
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        // console.log(this.props.ingredients)

        this.setState({ loading: true })
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] =
                // take only the value property of the
                // orderForm
                this.state.orderForm[formElementIdentifier].value
        }
        // calculate the final price on the server
        // to ensure the user is not manipulating
        // the code before sending it

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,

        }
        axios.post('https://react-burger-293ce.firebaseio.com/orders.json', order)
            .then(response => {
                // console.log(response.data.name)
                this.setState({
                    loading: false,
                })
                this.props.history.push('/')
            })
            .catch(error => {
                // console.log(error)
                this.setState({
                    loading: false,
                })
            })
    }

    checkValidity(value, rules) {
        let isValid = false
        if (rules.required) {
            isValid = value.trim() !== ''
        }

        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // event.preventDefault()
        // create a copy of the state before
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.valid =
            this.checkValidity(updatedFormElement.value,
                updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            //formIsValid will only be valid when all the fields are valid
            // without formIsValid attached to the check,
            // only the last valid value will be set to formIsValid
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })

    }
    render() {
        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.placeholder}
                            invalid={!formElement.config.valid}
                            changed={(event) => this.inputChangedHandler(event,
                                formElement.id)}
                            valueType={formElement.id}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.shouldValidate} />
                    ))
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData