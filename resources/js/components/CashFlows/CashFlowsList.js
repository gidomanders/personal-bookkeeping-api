import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import CashFlow from './CashFlow'
import Loading from '../Loading'
import Error from '../Error'

class CashFlowsList extends Component {
    constructor() {
        super()
        this.state = {
            cashFlows: [],
            error: '',
            loading: true
        }
    }

    loadData() {
        return axios.get('/api/cash-flows').then(response => {
            this.setState({
                cashFlows: response.data,
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
        const {cashFlows, loading, error} = this.state
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
                <div className='c-cash-flows-list__content'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/cash-flows/new'>
                        Create new cash flow
                    </Link>
                    {cashFlows &&
                    <ul className='list-group list-group-flush'>
                        {cashFlows.map(cashFlow => (
                            <CashFlow cashFlow={cashFlow} key={cashFlow.id}/>
                        ))}
                    </ul>
                    }
                </div>
            )
        }

        return (
            <div className='c-cash-flows-list container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All cash flows</div>
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

export default CashFlowsList
