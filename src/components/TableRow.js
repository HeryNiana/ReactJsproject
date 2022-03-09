import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
class TableRow extends Component {
constructor(props) {
super(props);
this.delete = this.delete.bind(this);
this.state={redirect:false};
}
delete() {
axios.delete('http://localhost:8000/api/clients/'+this.props.obj.id)
.then(
	this.setState({redirect:true})
	)
.catch(err => console.log(err))
}
render() {
	const {redirect}=this.state;
	if(redirect){
		return <Redirect to='/index'/>
	}
return (
	<tr className="tr1">
		<td> {this.props.obj.person_name} </td>
		<td> {this.props.obj.business_name} </td>
		<td> {this.props.obj.business_gst_number} </td>
		<td><Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Editer</Link></td>
		<td> <button onClick={this.delete} className="btn btn-danger">Supprimer</button> </td>
	</tr>
  );
}
}
export default TableRow;