import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard/Dashboard'
import NewBalance from './Balances/NewBalance'
import SingleBalance from './Balances/SingleBalance'
import BalancesList from './Balances/BalancesList'
import NewCashFlow from './CashFlows/NewCashFlow'
import SingleCashFlow from './CashFlows/SingleCashFlow'
import CashFlowsList from './CashFlows/CashFlowsList'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/balances/new' component={NewBalance}/>
                        <Route path='/balances/:id' component={SingleBalance}/>
                        <Route path='/balances' component={BalancesList}/>
                        <Route path='/cash-flows/new' component={NewCashFlow}/>
                        <Route path='/cash-flows/:id' component={SingleCashFlow}/>
                        <Route path='/cash-flows' component={CashFlowsList}/>
                        <Route path='/' component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'))
}
