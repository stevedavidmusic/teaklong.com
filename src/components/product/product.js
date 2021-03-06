import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './product.css';
import { withAlert } from 'react-alert'
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Product extends Component {
  constructor(props) {
    super()
    this.state = {
      items: [],
      price: ''
    }
  }

  componentDidMount(){
    this.getProduct()
  }

  getProduct = () => {
    axios.get(`/api/one/${this.props.match.params.id}`).then(res => {
      this.setState({
        items: res.data
      })
    })
  }
  
  addToCart = (name, price, img, description, id) => {
    { this.props.show === true
      ?
      axios.post('/session/cart', {name: name, price: price, img: img, description: description, id: id}).then(cart => {
        this.props.alert.show(`${name} added to cart`)
    })
    : this.props.alert.show('please log in to add to cart')
    } 
  }

  deleteItem = (id) => {
    axios.delete(`/api/delete/${id}`).then(res => {
      this.props.alert.show('Item has been deleted');
      {this.props.history.push(`/products/all`)}
    })
  }

  handleChangeInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  editPrice = (price, id) => {
    axios.put(`/api/edit/${id}`, {price}).then(res => {
      this.props.alert.show('Price Edited')
      {this.getProduct()}
      this.setState({
        price: ''
      })
    })
  }

  render() {
    return (
      <div className='felxme1'>
        <div className='prod-one'>
        {this.state.items.map(item => {
          return <div >
          <div className='full-one'>
              <div className='half-one'>
                <button className='left' onClick={() => this.props.history.push(`/products/${item.type}s`)}>Back</button> <br />
                <h1>{item.name}</h1> <br />
                <b>Price:</b> {item.price} <br />
              </div>

              <div className='half-life'>

                <div>
                  <img className='prodImg' src={item.img} />
                </div>

                <div>
                  <p className='desc'>{item.description} </p> <br />
                </div>
              </div>
              <div>
                  <button onClick={() => this.addToCart(item.name, item.price, item.img, item.description, item.id)}>Add to Cart</button>
                </div>
          </div>
          {
            this.props.show === true &&
            this.props.user.user.admin === true
            ?
            <div>
            <p><input className='addInput' name='price' value={this.state.price} onChange={(e) => this.handleChangeInput(e)}/><button onClick={() => this.editPrice(this.state.price, item.id)}>Edit Price</button></p>
            <button onClick={() => this.deleteItem(item.id)}>Delete Item</button>
            </div>
            :
            <div></div>
          }
          </div>
        })
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    user: state.user,
    show: state.show
  }
}

export default withAlert(connect(mapStateToProps)(Product));