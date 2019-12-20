import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo />
        <div style={{ marginRight: 'auto', marginLeft: '16px' }}>Menu</div>
        <nav>
            <NavigationItems/>  
        </nav>
    </header>
)

export default toolbar