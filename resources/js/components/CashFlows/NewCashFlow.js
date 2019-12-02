import React, {Component} from 'react'
import axios from 'axios'

class NewCashFlow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: 0,
            errors: [],
            loading: false
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewCashFlow = this.handleCreateNewCashFlow.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewCashFlow(event) {
        event.preventDefault()
        this.setState({loading: true})

        const {history} = this.props

        const cashFlow = {
            name: this.state.name,
            status: this.state.status
        }

        axios.post('/api/cash-flows', cashFlow)
            .then(response => {
                history.push('/cash-flows')
            }).catch(error => {
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
        const {loading} = this.state

        return (
            <div className='c-new-cash-flow container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new cash flow</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewCashFlow}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                            disabled={loading}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='status'>Status</label>
                                        <input
                                            id='status'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('status') ? 'is-invalid' : ''}`}
                                            name='status'
                                            value={this.state.status}
                                            onChange={this.handleFieldChange}
                                            disabled={loading}
                                        />
                                        {this.renderErrorFor('status')}
                                    </div>
                                    <button className='btn btn-primary' disabled={loading}>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewCashFlow
