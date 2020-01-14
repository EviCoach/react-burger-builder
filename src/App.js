import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

class App extends Component {



  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
