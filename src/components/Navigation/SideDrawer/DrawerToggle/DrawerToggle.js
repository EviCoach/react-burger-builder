import React from 'react'

import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle}
        style={{ marginRight: 'auto', marginLeft: '16px' }}
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle