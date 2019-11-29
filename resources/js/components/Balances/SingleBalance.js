import axios from 'axios'
import React, { Component } from 'react'

class SingleBalance extends Component {
    constructor (props) {
        super(props)
        this.state = {
            balance: {},
            categories: [],
            name: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleAddNewCategory = this.handleAddNewCategory.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    componentDidMount () {
        const balanceId = this.props.match.params.id

        axios.get(`/api/balances/${balanceId}`).then(response => {
            this.setState({
                balance: response.data
            })
        })
        axios.get(`/api/categories`).then(response => {
            this.setState({
                categories: response.data
            })
        })
    }

    handleFieldChange (event) {
        this.setState({
            title: event.target.value
        })
    }

    handleAddNewCategory (event) {
        event.preventDefault()

        const category = {
            name: this.state.name
        }

        axios.post('/api/categories', category)
            .then(response => {
                // clear form input
                this.setState({
                    name: ''
                })
                // add new category to list of categories
                this.setState(prevState => ({
                    categories: prevState.categories.concat(response.data)
                }))
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render () {
        const { balance, categories } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>{balance.start_date} - {balance.end_date}</div>
                            <div className='card-body'>
                                <ul className='list-group'>
                                    {categories.map(category => (
                                        <li
                                            className='list-group-item d-flex justify-content-between align-items-center'
                                            key={category.id}
                                        >
                                            {category.name}
                                            <ul className='list-group'>
                                                {categories.map(category => (
                                                    <li
                                                        className='list-group-item d-flex justify-content-between align-items-center'
                                                        key={category.id}
                                                    >
                                                        {category.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>

                                <hr />

                                <form onSubmit={this.handleAddNewCategory}>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            name='name'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            placeholder='Category name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        <div className='input-group-append'>
                                            <button className='btn btn-primary'>Add</button>
                                        </div>
                                        {this.renderErrorFor('name')}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleBalance
