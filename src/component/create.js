import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Create() {
   //let history = useHistory();
    //about the lifecycle of react hooks
    const [person_name, setPerson_name] = useState('');
    const [business_name, setBusiness_name] = useState('');
    const [business_gst_number, setBusiness_gst_number] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let token=localStorage.getItem('jwtToken');
        let config={
            headers:{
              'Authorization':token
            }
          };
          const obj = {
            person_name: person_name,
            business_name: business_name,
            business_gst_number: business_gst_number
            };
          axios.post(`http://localhost:8000/api/clients`, obj,config).then(() => {
            window.location.href = '/data'       
         })
        
     }
     if(localStorage.getItem('jwtToken') === null){
        window.location.href = '/login'    
      } else {
        return (
            <div className='row'>
                <div className="col-sm-4 col-md-4 col-lg-4"></div>
                 <div className="col-sm-4 col-md-4 col-lg-4">
                <h1 className='titre'> Nouveau client</h1>
                <form onSubmit={handleSubmit} className="form-group">
                    <div className='form-group'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='First Name' onChange={(e) => setPerson_name(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>Business Name</label>
                        <input type='text' className='form-control'  placeholder='Last Name' onChange={(e) => setBusiness_name(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>Number</label>
                        <input type='number' className='form-control' placeholder='Number' onChange={(e) => setBusiness_gst_number(e.target.value)} />  
                     </div>       
                    <button className='btn btn-primary' type='submit'> Ajouter </button>
                </form>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4"></div>
            </div>
           
        )
      }
}
