import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  Login from '../component/Form';
import { logoutUser } from '../actions/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Link ,withRouter} from 'react-router-dom';
class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8000/api/clients/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name, 
                business_name: response.data.business_name,
                business_gst_number: response.data.business_gst_number });
          })
          .catch(function (error) {
              console.log(error);
          })
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

  onSubmit=async(e)=> {
    e.preventDefault();
    let config={
      headers:{
        'Authorization':this.actionInput.value
      }
    };
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    };
    const res=await axios.put('http://localhost:8000/api/clients/'+this.props.match.params.id, obj,config);
        //.then(res => console.log(res.data));
        this.setState({
          person_name: '',
          business_name: '',
         // business_image: null,
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
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
              <form onSubmit={this.onSubmit}>
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
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
              </div>
              <div className="col-sm-4"></div>
            </div>
        </div>
       )
return (
        <p>{isAuthenticated ? connected : connexion}</p>

    )
  }
}

Edit.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
//to_connect_a_react_component_to_a_redux_store
export default connect(mapStateToProps, { logoutUser })(withRouter(Edit));