import React from 'react'
import BudgetsList from '../Budgets/BudgetsList'
import CategoriesList from './CategoriesList'

const Category = (props) => {
    return (
        <li className='c-category list-group-item'>
            {props.category.hasChildCategories &&
            <span>{props.category.name}</span>
            }
            {!props.category.hasChildCategories &&
            <div className='d-flex justify-content-between'>
                {props.category.name}
                <BudgetsList category={props.category} balance={props.balance}/>
            </div>
            }
            <CategoriesList category={props.category} balance={props.balance}/>
        </li>
    )
}

export default Category
