import React, {useState,useEffect } from "react";
import axios from 'axios';
import Datatable from './datatable';
require("es6-promise").polyfill();
require("isomorphic-fetch");
export const Delete=(id)=>{
axios.get('/api/delete/'+id)
.then(
	this.setState({redirect:true})
	)
.catch(err => console.log(err))
}
export default function Okay(){
	const [data,setData]=useState([]);
	const [q,setQ]=useState("");
	const [searchColumns,setSearchColumns]=useState(["person_name", "business_name"])
	useEffect(()=>{
		axios.get('/api/business')
			.then((response) => response.data) 
			.then((data)=>setData(data));
	},[]);
	function search(rows){
		return rows.filter((row) =>
			searchColumns.some(
				(column) =>
				   row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
				)
			);
		//return rows.filter((row)=> row.persone_name.toLowerCase().indexOf(q) > -1);
	}
	const columns=data[0] && Object.keys(data[0]);
	return(                                                                           
	<div className="row">
	    <div className="col-sm-8" data>
			<input className="form-control" type="text" value={q} onChange={(e) =>setQ(e.target.value)} />
			<table className="table table-bordered" >
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
			</table>
			<Datatable data={ search(data) } />
		</div>
		<div className="col-sm-4 " ></div>

	</div>
	);
}