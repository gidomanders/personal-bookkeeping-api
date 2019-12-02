import React, {Component} from 'react'
import axios from 'axios'
import qs from 'qs'
import NewCategory from './NewCategory'
import Category from './Category'
import Loading from '../Loading'
import Error from '../Error'

class CategoriesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: props.balance,
            parent: props.category,
            categories: [],
            error: '',
            loading: true
        }
        this.updateList = this.updateList.bind(this)
    }

    updateList(response) {
        this.setState(prevState => ({
            categories: prevState.categories.concat(response.data)
        }))
    }

    loadData() {
        const {parent} = this.state
        const params = {}
        if (parent) {
            params.filter = {category_id: parent.id}
        }
        return axios.get('/api/categories', {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then(response => {
            this.setState({
                categories: response.data,
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
        const {balance, parent, categories, loading, error} = this.state
        if (loading) {
            return (
                <div className='c-categories-list'>
                    <Loading/>
                </div>
            )
        }

        if (error) {
            return (
                <div className='c-categories-list'>
                    <Error content={error}/>
                </div>
            )
        }

        if (categories.length) {
            return (
                <div className='c-categories-list'>
                    {categories &&
                    <ul className='list-group'>
                        {categories.map(category => (
                            <Category category={category} balance={balance} key={category.id}/>
                        ))}
                    </ul>
                    }
                    <NewCategory parent={parent} updateList={this.updateList}/>
                </div>
            )
        }

        if (!parent || !parent.category_id) {
            return (
                <div className='c-categories-list'>
                    <NewCategory parent={parent} updateList={this.updateList}/>
                </div>
            )
        }

        return ''
    }
}

export default CategoriesList
