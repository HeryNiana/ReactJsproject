import React, { Component } from 'react';
import { FormErrors1 } from './FormErrors';
import { FormErrors2 } from './FormErrors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import './Form.css';
class Form extends Component {
  constructor (props) {
    super(props);
    //declare tous les variable et ses état initial
    this.state = {
      email: '',
      password: '',
      formErrorsemail: {email: ''},
      formErrorspass: {password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
 
  validateField(fieldName, value) {
    let fieldValidationErrors2 = this.state.formErrorsemail;
    let fieldValidationErrors3 = this.state.formErrorspass;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'Adresse':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.setState({email:value});
        fieldValidationErrors2.email = emailValid ? '' : '  invalide';
        break;
      case 'Mot de passe':
        passwordValid = value.length >= 8;
        fieldValidationErrors3.password = passwordValid ? '': '  trop courte';
        this.setState({password:value});
        break;
      default:
        break;
    }
    this.setState({
               formErrorsemail:fieldValidationErrors2,
               formErrorspass:fieldValidationErrors3,
               emailValid: emailValid,
               passwordValid: passwordValid,
           }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  ok=(e)=> {
    e.preventDefault();
    const user = {
      email:this.state.email,
      password:this.state.password
    };
   this.props.loginUser(user);  
   //const res=await axios.post('http://localhost:8000/connexion', obj);
   this.setState({
      email: '',
      password:'',
      formErrorsemail: {email: ''},
      formErrorspass: {password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    });
  }

 componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

 componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
   }

  render () {
    return (
        <div className="row">
                    <div className="clearfix"></div>
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
          <div className="col-sm-4 col-md-4 col-lg-4 contenu">
          <div className="form-group ">
          <form className="demoForm form-group" onSubmit={this.ok}>
        <h2 className="titre">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connexion
        </h2>
        <div className="form-group col-md-6 input-group">
          <label htmlFor="email"> Adresse Email :</label>
          <div className="form-group input-group">
          <input type="email" required className="form-control" name="Adresse"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
            </div>
        </div>
         <div className=" erreur panel panel-default">
          <FormErrors1 formErrorsemail={this.state.formErrorsemail} />
        </div>
        <div className="form-group col-md-6 input-goup">
          <label htmlFor="password">Mot de passe :</label>
          <div className="form-group input-group">
          <input type="password" className="form-control" name="Mot de passe"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
            </div>
        </div>
         <div className=" erreur panel panel-default">
          <FormErrors2 formErrorspass={this.state.formErrorspass} />
        </div>
        <div class="separator">
        <div className="form-group col-md-6 input-goup">
        <input type="submit" className="btn btn-primary" value="login" disabled={!this.state.formValid} />
        </div>
        </div>
      </form>
      </div>
         <div className="col-sm-4 col-md-4 col-lg-4"></div>
          </div>
        </div>
    )
  }
}
//la_fonction_propTypes_valides_les_types_des_objets_ou_des_fonctions
Form.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Form)