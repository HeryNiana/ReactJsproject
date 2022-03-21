import React, {useState,useEffect } from "react";
import axios from 'axios';
import Datatable from './datatable';
import Pagination from './pagination';
import DeleteConfirmation from "../component/confirmTwo";

require("es6-promise").polyfill();
require("isomorphic-fetch");
export default function Okay(){
	const [data,setData]=useState([]);
	const [loading, setLoading]=useState(false);
	const [q,setQ]=useState("");
	const [searchColumns,setSearchColumns]=useState(["person_name", "business_name"])
	useEffect(()=>{
		let token=localStorage.getItem('jwtToken');
        let config={
        headers:{
          'Authorization':token
        }
      };
        axios.get('http://localhost:8000/api/clients',config)
			.then((response) => response.data) 
			.then((data)=>setData(data))
			.then(setLoading(false));
	},[]);
	//pour l'index
	const getData = () => {
        let token=localStorage.getItem('jwtToken');
        let config={
        headers:{
          'Authorization':token
        }
      };
      axios.get('http://localhost:8000/api/clients',config)
            .then((getData) => {
                setData(getData.data);
            });
    }
	//envoye les données dans la localStorage qui sert à modifier das update 
    const setUpdate = (data) => {
        let { id, person_name, business_name, business_gst_number } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('person_name', person_name);
        localStorage.setItem('business_name', business_name);
        localStorage.setItem('business_gst_number', business_gst_number)
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
    setDisplayConfirmationModal(false);
  };
	function search(rows){
		return rows.filter((row) =>
			searchColumns.some(
				(column) =>
				   row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
				)
			);
	}
	const columns=data[0] && Object.keys(data[0]);
    const [currentPage, setCurrentPage]=useState(1);
    const [postsPerPage, setPostPerPage]=useState(5);
	//Get current page
	const indexOfLastPost = currentPage *postsPerPage;
	const indexOfFirstPost=indexOfLastPost - postsPerPage;
	const currentPosts=search(data).slice(indexOfFirstPost, indexOfLastPost);

	//Get the current page
	const paginate = pageNumber => setCurrentPage(pageNumber);
	if(localStorage.getItem('jwtToken') === null){
		window.location.href = '/login'       
	  } else {
	return(                                                                           
	<div className="row">
		<label>Affichage par page: </label>   
        <select className="form-control mb-8 col-sm-2" value={postsPerPage} onChange={(e) =>setPostPerPage(e.target.value)} >
			<option>5</option>
            <option>10</option>
		</select>
			<input className="form-control mb-8 col-sm-2" placeholder="Recherche" type="text" value={q} onChange={(e) =>setQ(e.target.value)} />
			<table className="table table-bordered" >
			<thead>
			<tr>
			{columns && columns.map((column) => 
				<th>
					<input type="checkbox"
					checked={searchColumns.includes(column)}
					onChange={(e) => {
						const checked=searchColumns.includes(column);
						setSearchColumns((prev) =>
						checked
						? prev.filter((sc) =>sc !== column)
						:  [...prev,column]
						);
					}}
				 />
				{column}

			</th>
			)}
			</tr>
			</thead>
			<Datatable data={ currentPosts } showDeleteModal={ showDeleteModal} loading={loading}  />
			</table>
			<Pagination 
            postPerPage={postsPerPage} 
            totalPosts={search(data).length} 
            paginate={ paginate} />
			<DeleteConfirmation showModal={displayConfirmationModal} 
            confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
		<div className="col-sm-4 " ></div>

	</div>
	);
 }
}