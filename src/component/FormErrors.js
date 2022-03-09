import React from 'react';
import './Form.css';

export const FormErrors = ({formErrorsname}) =>
  <div className='formErrorsname'>
    {Object.keys(formErrorsname).map((fieldName, i) => {
      if(formErrorsname[fieldName].length > 0){
        return (
          <p className="error" key={i}>{fieldName} {formErrorsname[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
  export const FormErrors1 = ({formErrorsemail}) =>
  <div className='formErrorsemail'>
    {Object.keys(formErrorsemail).map((fieldName, i) => {
      if(formErrorsemail[fieldName].length > 0){
        return (
          <p  className="error" key={i}>{fieldName} {formErrorsemail[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
  export const FormErrors2 = ({formErrorspass}) =>
  <div className='formErrorspass'>
    {Object.keys(formErrorspass).map((fieldName, i) => {
      if(formErrorspass[fieldName].length > 0){
        return (
          <p  className="error" key={i}>{fieldName} {formErrorspass[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
