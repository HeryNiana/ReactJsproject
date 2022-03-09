import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authentication';
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Navbar from './components/Navbar';
//import Register from './components/Register';
//about the second login
import  Form from './component/Form';
import Home from './components/Home';
import Read from './component/read';
import  Data from './components/okay';
//about_the_crud
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

if(localStorage.jwtToken) {
  //setAuthToken(localStorage.jwtToken);
  const decoded = localStorage.jwtToken;
  const dateinit= localStorage.getItem('dateCreate');
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  const validate=currentTime - dateinit;
  if( validate > 3600) {
    store.dispatch(logoutUser());
    //window.location.href = '/login'
   }
}
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />

                <Route exact path="/" component={ Home } />
                <div className="container">
                <Switch>
                    <Route exact path='/create' component={ Create } />
                    <Route path='/edit/:id' component={ Edit } />
                    <Route exact path="/login" component={ Form } />
                    <Route exact path="/read" component={Read} />
                    <Route path='/index' component={ Index } />
                    <Route exact path='/data' component={ Data } />
              </Switch>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
