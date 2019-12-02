import React, {Component} from 'react'
import axios from 'axios'
import qs from 'qs'

class Budget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: props.balance,
            budget: props.budget,
            transactions: [],
            loading: true,
            error: ''
        }
        this.handleStatusPaid = this.handleStatusPaid.bind(this)
    }

    componentDidMount() {
        axios.get('/api/transactions', {
            params: {
                filter: {
                    balance_id: this.state.balance.id,
                    category_id: this.state.budget.category_id
                }
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
            .then(response => {
                this.setState({
                    transactions: [response.data],
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

    handleStatusPaid(event) {
        event.preventDefault()
        this.setState({loading: true})

        axios.post('/api/budgets/' + this.state.budget.id + '/paid', {
            balance_id: this.state.balance.id
        })
            .then(response => {
                this.setState({
                    transactions: [response.data],
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

    render() {
        const {budget, transactions, loading} = this.state
        console.log(budget.category_id, transactions.length)

        return (
            <li className={'c-budget list-group-item' + (!budget.category.flexible && budget.cash_flow_id && transactions.length ? ' bg-success' : '')}>
                <span className='c-budget__amount'>{budget.amount}</span>
                {!budget.category.flexible && budget.cash_flow_id && !transactions.length &&
                <form onSubmit={this.handleStatusPaid}>
                    <button className='btn btn-success' disabled={loading}>&#10004;</button>
                </form>
                }
            </li>
        )
    }
}

export default Budget
