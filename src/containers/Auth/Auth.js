import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                shouldValidate: true,
                touched: false
            },

        }
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName]
                    .validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }
    checkValidity(value, rules) {
        let isValid = false
        if (rules.required) {
            isValid = value.trim() !== ''
        }

        return isValid
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value)
    }
    render() {
        // convert state object to an array we can loop thru
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formElement => (
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
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth)