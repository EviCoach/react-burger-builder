import React from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

const modal = (props) => {
    return <Auxiliary>
        <Backdrop show={props.show} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
                // display: props.show ? 'block' : 'none'
            }}>
            {props.children}
        </div>
    </Auxiliary>
}
export default modal