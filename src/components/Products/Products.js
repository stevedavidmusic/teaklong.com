import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import routes from '../../routes/routes2';
import './Products.css';
import menu from '../../media/menu-icon-button-14.jpg';

class Products extends Component {
  constructor(){
    super();
    this.state = {
      toggleNav: false
    }
  }

  toggle = () => {
    this.setState((prevState) => {
        return {
            toggleNav: !prevState.toggleNav
        }
    })
}

  render() {
    return (
      <div className='cent'>
        <nav className={this.state.toggleNav ? 'types' : 'none'}>
        <Link to='/products/completes' ><p onClick={this.toggle}>Completes</p></Link>
        <Link to='/products/decks' ><p onClick={this.toggle}>Decks</p></Link>
        <Link to='/products/wheels' ><p onClick={this.toggle}>Wheels</p></Link>
        </nav>
        <div className={this.state.toggleNav ? 'nav-but': 'nav-but'} ><p>
          <div className='work' onClick={this.toggle}>
          <div className={this.state.toggleNav ? 'menu-back' :  'menu-back' }>
          <div className={this.state.toggleNav ? 'menu-div' : 'menu-div'}></div>
          <div className={this.state.toggleNav ? 'menu-div' : 'menu-div'}></div>
          <div className={this.state.toggleNav ? 'menu-div' : 'menu-div'}></div>
          </div>
          </div>
        </p></div>
        {routes}
      </div>
    )
  }
}

export default Products;