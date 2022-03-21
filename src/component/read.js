import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DeleteConfirmation from "./confirmTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        //e.preventDefault();
        let token=localStorage.getItem('jwtToken');
        let config={
        headers:{
          'Authorization':token
        }
      };
        axios.get('http://localhost:8000/api/clients',config)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);           
         })
    }, []);
    const getData = () => {
        let token=localStorage.getItem('jwtToken');
        let config={
        headers:{
          'Authorization':token
        }
      };
      axios.get('http://localhost:8000/api/clients',config)
            .then((getData) => {
                setAPIData(getData.data);
            });
    }

    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [fruitMessage, setFruitMessage] = useState(null);
    const showDeleteModal = ( id) => {
      setId(id);
      setFruitMessage(null);
        setDeleteMessage(`Are you sure you want to delete this client`);
      setDisplayConfirmationModal(true);
    };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    let config={
      headers:{
        'Authorization':localStorage.getItem('jwtToken')
      }
    };
    axios.delete(`http://localhost:8000/api/clients/${id}`, config)
    .then(() => {
        getData();
    })
      setFruitMessage(`Le clients selectioné était supprimé avec succes.`);
      //setFruits(fruits.filter((fruit) => fruit.id !== id));
    setDisplayConfirmationModal(false);
  };

    if(localStorage.getItem('jwtToken') === null){
      window.location.href = '/login'       
    } else {
      return (
        <div>
           <h3 className="titre" align="center">Business List</h3>
           {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
        <table className="table datatable table-striped">
          <thead>
            <tr>
                <th>Person Name</th>
                <th>Business Name</th>
                <th>Numéro statistique</th>
                <th rowSpan={2}>Actions</th>
            </tr>
         </thead>
        <tbody>
            {APIData.map((data) => {
                return (
                    <tr>
                        <td>{data.person_name}</td>
                        <td>{data.business_name}</td>
                        <td>{data.business_gst_number}</td>
                        <td><Link to={"/edit/"+data.id} className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} />
                          </Link></td>
                        <td className='text-center'>
                          <p className="deleteData" ><FontAwesomeIcon icon={faTrash} className="text-danger" 
                          onClick={() => showDeleteModal(data.id)} />
                          </p>
                        </td>
                    </tr>
                )
            })}
        </tbody>
            </table>
            <DeleteConfirmation showModal={displayConfirmationModal} 
            confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
        </div>
    )
    }
   
}