import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setProduct} from '../../ducks/reducer'
import { withAlert } from 'react-alert'
import './Search.css';

class Search extends Component {
    constructor(){
        super();
        this.state = {
          searchText: '',
          completes: []
        }
    }

    changePage = (obj, id, type) => {
      this.props.setProduct(obj)
      this.props.history.push(`/products/${type}/item/${id}`)
    }

    searchItems = (item) => {
      this.state.searchText
      ?
      axios.get(`/api/search/${item}`).then(res => {
        this.setState({completes: res.data})
      })
      : this.props.alert.show('search is empty')
    }

    handleSearch = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  render() {
    return (
      <div className='hundred'>
        <div>
          <h1 className='titlee'>Search</h1>
          <input name='searchText' onChange={(e) => this.handleSearch(e)}/>
          <button onClick={() => this.searchItems(this.state.searchText)}>Search</button>
        </div>
        <div className='felxme'>
        {
          this.state.completes.length > 0
          ?
          this.state.completes.map(board => {
            return <div className='prod' onClick={() => this.changePage({name: board.name, price: board.price, img: board.img, description: board.description, type: board.type, id: board.id}, board.id, board.type)}>
              <h3>{board.name}</h3>
              <img alt='picture of a longboard' className='prodImg' src={board.img} />
              <p>${board.price}</p>
            </div>
          })
        : <div></div>
        }
        </div>
        {
            this.props.user !== null || this.state.completes.length === 0
            ?
            <div>
            </div>
            :<div>
                
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user,
    show : state.show
  }
}

export default withAlert(connect(mapStateToProps, {setProduct})(Search));