import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => (
    <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
            <Link className='navbar-brand' to='/'>Personal bookkeeping</Link>
            <Link to='/balances'>Balances</Link>
            <Link to='/cash-flows'>Cash flows</Link>
        </div>
    </nav>
)

export default Header
