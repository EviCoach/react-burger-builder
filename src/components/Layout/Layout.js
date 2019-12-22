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

    sideDrawerToggleHandler = () => {
        // this.setState({
        //     due to the asynchronous form of setState
        //     this may lead to unexpected outcome
        //     showSideDrawer: !this.state.showSideDrawer
        // })

        this.setState((previousState) => {
            return { showSideDrawer: !this.state.showSideDrawer }
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
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