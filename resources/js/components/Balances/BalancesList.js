import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Loading from '../Loading'
import Error from '../Error'
import Balance from './Balance'

class BalancesList extends Component {
    constructor() {
        super()
        this.state = {
            balances: [],
            error: '',
            loading: true
        }
    }

    loadData() {
        return axios.get('/api/balances').then(response => {
            this.setState({
                balances: response.data,
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
        const {balances, loading, error} = this.state
        let content
        if (loading) {
            content = (
                <Loading/>
            )
        } else if (error) {
            content = (
                <Error content={error}/>
            )
        } else {
            content = (
                <div className='c-balances-list__content'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/balances/new'>
                        Create new balance
                    </Link>
                    {balances &&
                    <ul className='list-group list-group-flush'>
                        {balances.map(balance => (
                            <Balance balance={balance} key={balance.id}/>
                        ))}
                    </ul>
                    }
                </div>
            )
        }

        return (
            <div className='c-balances-list container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All balances</div>
                            <div className='card-body'>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BalancesList
