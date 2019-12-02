import React, {Component} from 'react'
import axios from 'axios'

export default class NewBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: props.category,
            cashFlows: [],
            cash_flow_id: undefined,
            amount: 0,
            error: '',
            errors: [],
            loading: true
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddNewBudget = this.handleAddNewBudget.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    componentDidMount() {
        this.loadCashFlows()
    }

    loadCashFlows() {
        axios.get('/api/cash-flows')
            .then(response => {
                this.setState({
                    cashFlows: response.data,
                    loading: false,
                    error: false
                })
            })
            .catch(error => {
                this.setState({
                    error: `${error}`,
                    loading: false
                })
            })
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddNewBudget(event) {
        event.preventDefault()
        this.setState({loading: true})

        const budget = {
            category_id: this.state.category.id,
            cash_flow_id: this.state.cash_flow_id,
            amount: this.state.amount
        }

        axios.post('/api/budgets', budget)
            .then(response => {
                this.setState({
                    cash_flow_id: undefined,
                    amount: 0,
                    errors: []
                })
                this.props.updateList(response)
            })
            .catch(error => {
                console.error('error: ', error)
                this.setState({
                    errors: error.response.data.errors,
                    loading: false
                })
            })
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        const {cashFlows, loading} = this.state

        return (
            <form onSubmit={this.handleAddNewBudget}>
                <div className='form-group'>
                    <label htmlFor='cash_flow_id'>
                        Cash flow
                    </label>
                    <select
                        id='cash_flow_id'
                        className={`form-control ${this.hasErrorFor('cash_flow_id') ? 'is-invalid' : ''}`}
                        name='cash_flow_id'
                        onChange={this.handleFieldChange}
                        disabled={loading}>
                        <option value=''>None</option>
                        {cashFlows && cashFlows.map(cashFlow => (
                            <option key={cashFlow.id} value={cashFlow.id}>{cashFlow.name}</option>
                        ))}
                    </select>
                    {this.renderErrorFor('cash_flow_id')}
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>
                        Amount
                    </label>
                    <input
                        id='amount'
                        type='number'
                        className={`form-control ${this.hasErrorFor('amount') ? 'is-invalid' : ''}`}
                        name='amount'
                        value={this.state.amount}
                        onChange={this.handleFieldChange}
                        disabled={loading}
                    />
                    {this.renderErrorFor('amount')}
                </div>
                <button className='btn btn-primary'>Add</button>
            </form>
        )
    }
}
