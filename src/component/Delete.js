import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Css from'../mycss.css';
import axios from 'axios';
class TableRow extends Component {
constructor(props) {
super(props);
}
componentDidMount() {
axios.get('http://localhost:8000/delete/'+this.props.match.params.id)
.then(
	this.props.history.push('/data')
	)
.catch(err => console.log(err))
}
render(){
return (
	<p>element bien supprimée</p>
  );
}
}
export default TableRow;