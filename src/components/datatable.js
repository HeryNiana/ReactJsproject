import React from "react";
import { Link } from 'react-router-dom';
export default function Datatable({ data }){
	const columns=data[0] && Object.keys(data[0]);
	return (
		<table className="table table-bordered" cellPadding={0} cellSpacing={0}>
			<thead>
				<tr className="tr1">{data[0] && columns.map((heading)=> <th>{heading}</th>)}
				<th colSpan="2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row)=>(
					<tr>
					 {columns.map((column) => (
					 	<td>{row[column]} </td>
					 	))}
						 <td> <Link to={"/edit/"+row._id} className="btn btn-primary"> Editer </Link></td>
						 <td> <Link to={"/delete/"+row._id} className="btn btn-danger"> Supprimer </Link></td>
					 </tr>
					))}
			</tbody>
		</table>
	);
}