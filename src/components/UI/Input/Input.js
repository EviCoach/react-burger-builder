import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null
    const inputClasses = [classes.InputElement]

    // if the form field is invalid and the 
    //  form field has shouldValidate property
    //  and it has been touched, ie, clicked on
    // apply this class
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig} value={props.value} />
            break
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig} value={props.value} />
            break
        case ('select'):
            inputElement = <select
                placeholder="Choose One"
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig} >
                {/* <option disabled value="disabled">Delivery Method</option> */}
                {
                    props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))
                }
            </select>
            break
        default:
            inputElement = <input className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig} value={props.value} />
    }

    let validationError = null
    if (props.invalid && props.touched) {
        let valueType = null
        switch (props.valueType) {
            case 'email':
                valueType = 'email address'
                break
            case 'zipCode':
                valueType = 'zip code'
                break
            case 'country':
                valueType = props.valueType
                break
            case 'name':
                valueType = props.valueType
                break
            case 'street':
                valueType = props.valueType + ' address'
                break
            default:
                valueType = 'value'
        }
        validationError = <p className={classes.ValidationError}>Please enter a valid {valueType}</p>
    }

    return (
        <div classes={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input