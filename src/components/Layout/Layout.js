import React, { Component as Holder } from 'react'

import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

class Layout extends Holder {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    toggleDrawer = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleDrawer={this.toggleDrawer} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>

        )
    }
}

export default Layout