import React, {Component} from 'react'
import axios from 'axios'
import Loading from '../Loading'
import Error from '../Error'

class SingleCashFlow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cashFlow: undefined,
            error: '',
            loading: true
        }
    }

    componentDidMount() {
        const cashFlowId = this.props.match.params.id
        this.setState({loading: true})

        axios.get(`/api/cashFlows/${cashFlowId}`).then(response => {
            this.setState({
                cashFlow: response.data,
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
        const {cashFlow, loading, error} = this.state
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
                <div className='card'>
                    <div className='card-header'>
                        {cashFlow.name}
                    </div>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            <span>Status</span>
                            <span>{cashFlow.status}</span>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='c-single-cash-flow container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleCashFlow
