import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function Datatable({ data,showDeleteModal,loading }){
	if(loading){
        return <h2>Loading of data ......</h2>
    }
	//const columns=data[0] && Object.keys(data[0]);
	console.log(data);
	return (
			<tbody>
				{data.map((row)=>(
					<tr>
						<td>{row.id }</td>
						<td>{row.person_name }</td>
						<td>{row.business_name }</td>
						<td>{row.business_gst_number }</td>
						<td><Link to={"/edit/"+row.id} className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} />
                          </Link></td>
                        <td className='text-center'>
                        <p className="deleteData"><FontAwesomeIcon icon={faTrash} className="text-danger" 
                          onClick={() => showDeleteModal(row.id) } />
						  </p> 
                        </td>
					 </tr>
					))}
			</tbody>
	);
}