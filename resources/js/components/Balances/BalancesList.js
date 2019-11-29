import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BalancesList extends Component {
    constructor () {
        super()
        this.state = {
            balances: []
        }
    }

    componentDidMount () {
        axios.get('/api/balances').then(response => {
            this.setState({
                balances: response.data
            })
        })
    }

    render () {
        const { balances } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All balances</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create new balance
                                </Link>
                                <ul className='list-group list-group-flush'>
                                    {balances.map(balance => (
                                        <Link
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                            to={`/${balance.id}`}
                                            key={balance.id}
                                        >
                                            {balance.start_date}
                                            {balance.end_date}
                                            <span className='badge badge-light badge-pill'>
                                                {balance.status[true]}
                                            </span>
                                            <span className='badge badge-dark badge-pill'>
                                                {balance.status[false]}
                                            </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BalancesList
