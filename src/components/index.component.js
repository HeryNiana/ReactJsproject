import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { BrowserRouter as Link ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import  Login from '../component/Form';
import { logoutUser } from '../actions/authentication';
import PropTypes from 'prop-types';
import $  from 'jquery';
class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      //let config={
      //  headers:{
      //    'Authorization':this.actionInput.value
      //  }
      //};
        $('.titre').css("color","red");
      axios.get('http://localhost:8000/api/clients')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      const {isAuthenticated, user} = this.props.auth;
      const connexion=(
        <Login/>
        )
      const connected=(
        <div>
           <form> 
             <input 
             type="hidden" 
             value={ user }
             ref={(input) => {this.actionInput=input}} />
            </form>
        <Link className="navbar-brand"  to={'/create'} className="nav-link"><i className="fa fa-plus"></i>Produits </Link>
        <h3 className="titre" align="center">Business List</h3>
        <table className="table datatable table-striped" style={{ textAlign:'center' }}>
          <thead>
            <tr>
              <th>Person name</th>
              <th>Business</th>
              <th>GST Number</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.tabRow() }
          </tbody>
        </table>
      </div>
      )
      return (
        <p>{isAuthenticated ? connected : connexion}</p>
      );
    }
  }
  Index.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  })
  //to_connect_a_react_component_to_a_redux_store
  export default connect(mapStateToProps, { logoutUser })(withRouter(Index));