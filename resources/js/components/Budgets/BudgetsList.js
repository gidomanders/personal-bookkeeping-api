import React, {Component} from 'react'
import axios from 'axios'
import qs from 'qs'
import Budget from './Budget'
import Error from '../Error'
import Loading from '../Loading'
import NewBudget from './NewBudget'

class BudgetsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: props.category,
            balance: props.balance,
            budgets: [],
            error: '',
            loading: true
        }
        this.updateList = this.updateList.bind(this)
    }

    updateList(response) {
        this.setState(prevState => ({
            budgets: prevState.budgets.concat(response.data)
        }))
    }

    loadData() {
        const {category, balance} = this.state
        const params = {filter: {}}
        if (category) {
            params.filter.category_id = category.id
        }
        if (balance) {
            params.filter.planned_between = balance.start_date + ',' + balance.end_date
        }
        return axios.get('/api/budgets', {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then(response => {
            this.setState({
                budgets: response.data.map(balance => {
                    balance.category = category
                    return balance
                }),
                loading: false,
                error: false
            })
        }).catch(error => {
            console.error('error: ', error)
            this.setState({
                error: `${error}`,
                loading: false
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const {balance, category, budgets, loading, error} = this.state
        if (loading) {
            return (
                <div className='c-budgets-list'>
                    <Loading/>
                </div>
            )
        }

        if (error) {
            return (
                <div className='c-budgets-list'>
                    <Error error={error}/>
                </div>
            )
        }

        if (budgets.length) {
            return (
                <div className='c-budgets-list'>
                    <ul className='list-group'>
                        {budgets.map(budget => (
                            <Budget key={budget.id} budget={budget} balance={balance}/>
                        ))}
                    </ul>
                </div>
            )
        }

        return (
            <div className='c-budgets-list'>
                <NewBudget category={category} updateList={this.updateList}/>
            </div>
        )
    }
}

export default BudgetsList
