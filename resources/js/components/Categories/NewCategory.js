import React, {Component} from 'react'
import axios from 'axios'

class NewCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parent: props.parent,
            name: '',
            flexible: false,
            errors: [],
            loading: false
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewCategory = this.handleCreateNewCategory.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewCategory(event) {
        event.preventDefault()
        this.setState({loading: true})

        const category = {
            category_id: this.state.parent ? this.state.parent.id : null,
            name: this.state.name,
            flexible: this.state.flexible,
            order: this.state.categories ? this.state.categories.length : 0
        }

        axios.post('/api/categories', category)
            .then(response => {
                this.setState({
                    name: '',
                    flexible: false,
                    errors: [],
                    loading: false
                })
                this.props.updateList(response)
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
            <form onSubmit={this.handleCreateNewCategory}>
                <hr/>
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
                <div className='form-check'>
                    <label className='form-check-label'>
                        <input
                            type='checkbox'
                            name='flexible'
                            id='flexible'
                            value='1'
                            className='form-check-input'
                            checked={this.state.flexible}
                            onChange={this.handleFieldChange}
                            disabled={loading}
                        />
                        Flexible
                    </label>
                    {this.renderErrorFor('flexible')}
                </div>
                <button className='btn btn-primary' disabled={loading}>Create</button>
            </form>
        )
    }
}

export default NewCategory
