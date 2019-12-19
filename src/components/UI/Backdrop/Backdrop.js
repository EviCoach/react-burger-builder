//  we didn't add the backdrop to the modal
// because we might need the backdrop elsewhere
import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => {
    const value = props.show ? <div className={classes.Backdrop}></div> : null
    return value
}

export default backdrop