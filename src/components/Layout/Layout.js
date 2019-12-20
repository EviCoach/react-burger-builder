import React from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const layout = (props) => (
    <Auxiliary>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
    
)

export default layout