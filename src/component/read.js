import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DeleteConfirmation from "./confirmTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import  Login from '../component/Form';
import { logoutUser } from '../actions/authentication';
import PropTypes from 'prop-types';
export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/clients')
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);
//envoye les données dans la localStorage
    const setData = (data) => {
        let { id, person_name, business_name, business_gst_number } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('person_name', person_name);
        localStorage.setItem('business_name', business_name);
        localStorage.setItem('business_gst_number', business_gst_number)
    }

    const getData = () => {
        axios.get('http://localhost:8000/api/clients')
            .then((getData) => {
                setAPIData(getData.data);
            })
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
    axios.delete(`http://localhost:8000/api/clients/${id}`)
    .then(() => {
        getData();
    })
      setFruitMessage(`The client was deleted successfully.`);
      //setFruits(fruits.filter((fruit) => fruit.id !== id));
    setDisplayConfirmationModal(false);
  };

    //const onDelete = (id) => {
    //    axios.delete(`http://localhost:8000/api/clients/${id}`)
    //    .then(() => {
    //        getData();
    //    })
    //}

    return (
        <div>
           <h3 className="titre" align="center">Business List</h3>
           {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
        <table className="table datatable table-striped" style={{ textAlign:'center' }}>
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
                        <td><Link to={"/edit/"+data.id} className="btn btn-primary">Editer</Link></td>
                        <td className='text-center'>
                          <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal(data.id)} />
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

/*Read.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
to_connect_a_react_component_to_a_redux_store
export default connect(mapStateToProps, { logoutUser })(withRouter(Read));*/
