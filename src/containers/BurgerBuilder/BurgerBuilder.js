import React, { Component } from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Auxiliary>
                <Burger />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder