import axios from 'axios'
import React, { Component } from 'react'

class NewBalance extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewBalance = this.handleCreateNewBalance.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewBalance (event) {
        event.preventDefault()

        const { history } = this.props

        const balance = {
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }

        axios.post('/api/balances', balance)
            .then(response => {
                // redirect to the homepage
                history.push('/')
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
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new balance</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewBalance}>
                                    <div className='form-group'>
                                        <label htmlFor='start_date'>Start date</label>
                                        <input
                                            id='start_date'
                                            type='date'
                                            className={`form-control ${this.hasErrorFor('start_date') ? 'is-invalid' : ''}`}
                                            name='start_date'
                                            value={this.state.start_date}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('start_date')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='end_date'>End date</label>
                                        <input
                                            id='end_date'
                                            type='date'
                                            className={`form-control ${this.hasErrorFor('end_date') ? 'is-invalid' : ''}`}
                                            name='end_date'
                                            value={this.state.end_date}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('end_date')}
                                    </div>
                                    <button className='btn btn-primary'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewBalance
