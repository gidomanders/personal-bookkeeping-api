import React from 'react'
import {Link} from 'react-router-dom'

const CashFlow = (props) => {
    return (
        <Link to={`/cash-flows/${props.cashFlow.id}`}
              className='c-cash-flow list-group-item list-group-item-action d-flex justify-content-start align-items-center'>
            <span class='c-cash-flow__name'>{props.cashFlow.name}</span>
            <span class='c-cash-flow__status'>{props.cashFlow.status}</span>
        </Link>
    )
}

export default CashFlow
