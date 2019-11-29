import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import BalancesList from "./BalancesList";
import NewBalance from "./NewBalance";
import SingleBalance from "./Balances/SingleBalance";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Redirect from='/' to='/balances' />
                        <Route path='/balances' component={BalancesList} />
                        <Route path='/balances/new' component={NewBalance} />
                        <Route path='/balances/:id' component={SingleBalance} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
