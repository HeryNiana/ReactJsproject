import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router';
export default class Createok extends Component {
constructor() 
{
  super();
  this.onChangePersonName = this.onChangePersonName.bind(this);
  this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
  this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
  this.ok = this.ok.bind(this);
  this.state = {
    person_name: '',
    business_name: '',
    business_gst_number:'',
    redirect:false
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
  const obj = {
    person_name: this.state.person_name,
    business_name: this.state.business_name,
    business_gst_number: this.state.business_gst_number
    };
    console.log(obj);
  const res=await axios.post('http://localhost:8000/saveok', obj);
  this.setState({
         person_name: '',
         business_name: '',
         business_gst_number: ''
});
  /*if(res.data.status ==200)
  {
    this.props.history.push('/index');
  }*/
}
render() {
  const {redirect}=this.state;
  if(redirect){
    return <Redirect to='/index' />
  }
return (
<div style={{ marginTop: 10 }}>
  <h3 align="center">Créer une compte <FontAwesomeIcon icon="coffee" /></h3>
  <div className="row">
  <div className="col-md-3"></div>
  <div className="col-md-6">
    <form onSubmit={this.ok}>
      <div className="form-group">
        <label> Libellé produit : </label>
        <input type="text" className="form-control" value={this.state.person_name} onChange={this.onChangePersonName} required="required" />
      </div>
      <div className="form-group">
        <label>Business Prix unitaire : </label>
        <input type="email" className="form-control" value={this.state.business_name} onChange={this.onChangeBusinessName} required="required" />
      </div>
      <div className="form-group">
<label>Stock disponible : </label>
<input type="password" className="form-control" value={this.state.business_gst_number} onChange={this.onChangeGstNumber} required="required"/>
</div>
       <div className="form-group">
        <input type="submit" value="Ajouter" className="btn btn-primary"/>
     </div>
    </form>
  </div>
  <div className="col-md-3"></div>
  </div>
</div>
 )
}
}