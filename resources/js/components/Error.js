import React from 'react'

const Error = (props) => {
    return (
        <div className='c-error alert alert-danger'>
            {props.content}
        </div>
    )
}

export default Error
