import React from 'react'
import {Link} from 'react-router-dom'

const Balance = (props) => {
    return (
        <Link to={`/balances/${props.balance.id}`}
              className='c-balance list-group-item list-group-item-action d-flex justify-content-start align-items-center'>
            <span className='c-balance__start-date p-1'>
                {new Intl.DateTimeFormat().format(new Date(props.balance.start_date))}
            </span>
            <span className='c-balance__end-date p-1'>
                {new Intl.DateTimeFormat().format(new Date(props.balance.end_date))}
            </span>
            <span className='c-balance__status'>
                <span className='c-balance__status-flexible badge badge-light badge-pill'>
                    {props.balance.status[true]}
                </span>
                <span className='c-balance__status-static badge badge-dark badge-pill'>
                    {props.balance.status[false]}
                </span>
            </span>
        </Link>
    )
}

export default Balance
