import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  Login from '../component/Form';
import { logoutUser } from '../actions/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Link ,withRouter} from 'react-router-dom';

class Createok extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.ok = this.ok.bind(this);

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:'',
      token:''
       }
  }
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  ok=async(e)=> {
    e.preventDefault();
    let config={
      headers:{
        'Authorization':this.actionInput.value
      }
    };
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      //business_image:this.state.business_image,
      business_gst_number: this.state.business_gst_number
      };
      console.log(config);
    const res=await axios.post('http://localhost:8000/api/clients', obj,config);
    this.setState({
           person_name: '',
           business_name: '',
           business_gst_number: ''
  });
    if(res.data.status ===200)
    {
      this.props.history.push('/read');
    }
  }
 
  render() {
    const {isAuthenticated, user} = this.props.auth;
     const connexion=(
       <Login/>
       )
     const connected=(
      <div className="container">
      <div className=" row ">
        <div className="col-sm-3 col-md-3 col-lg-3 list1">
          <h1>Liste des menu</h1>
          <ul className="navbar-nav mr-auto">
             <li className="nav-item">
               <Link to={'/index'} className="nav-link">
                  <button className="btn btn-success">List Produits</button>
               </Link>
             </li>
          </ul>
        </div>
        <div className="col-sm-9 col-md-9 col-lg-9 list">
           <h3 align="center">Nouveau client <FontAwesomeIcon icon="coffee" /></h3>
           <form onSubmit={this.ok}>
                   <input 
                    type="hidden" 
                    value={ user }
                    ref={(input) =>{this.actionInput=input}} />
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Register Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
           </div>
       </div>
  </div>
     )
  return (
    <p>{isAuthenticated ? connected : connexion}</p>
   )
  }
}
Createok.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
//to_connect_a_react_component_to_a_redux_store
export default connect(mapStateToProps, { logoutUser })(withRouter(Createok));