import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {updateUser, updateShow} from '../../ducks/reducer';
import { withAlert } from 'react-alert'
import './Nav.css';

class Nav1 extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount(){
    this.getAllz()
  }

  getAllz = () => {
    axios.get('/api/user-data').then(res => {
      this.props.updateUser(res.data)
      if(res.data.user){
        this.props.updateShow(true)
      } 
    })
  }

  login = () => {
    const redirecturi = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirecturi}&response_type=code`
    window.location = url;  
  }

  logout = () => {
    axios.post('/api/logout').then(() => {
      this.props.updateShow(false)
      this.props.updateUser(null)
      this.props.alert.show('Logged Out')
  })
}

  render() {
    const {user, show} = this.props;
    return (
      <div className='tomato2'>
      <div className='tomato'>
        <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/products/all'><button>Products</button></Link>
        <Link to='/cart'><button>Cart</button></Link>
        {show === false ?
        <button onClick={() => this.login()}>Log in</button>
        : ''
      }
        {show &&
        <div className='navProfile'>
          <Link to='/orders'><img src={user.user.picture}/></Link>
        </div>
        }
        </nav>
        
        
      </div>
        <div className={this.props.location.pathname !== '/' ? 'deskNav' : 'none'}>
        <div>
          <Link to='/choose/deck'><button onClick={this.toggle}>Build A Board</button></Link> 
        </div>
        <div className='desk-nav-sections'>
          <Link to='/products/completes' ><button onClick={this.toggle}>Completes</button></Link>
          <Link to='/products/decks' ><button onClick={this.toggle}>Decks</button></Link>
          <Link to='/products/wheels' ><button onClick={this.toggle}>Wheels</button></Link>
          <Link to='/products/trucks' ><button onClick={this.toggle}>Trucks</button></Link>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    show: state.show
  }
}


export default withAlert(withRouter(connect(mapStateToProps, {updateUser, updateShow})(Nav1)));