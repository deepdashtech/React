import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import axios from 'axios';

export const EditBook = () => {
    let {id}=useParams();
    let navigate=useNavigate();
    // let id=2;

    
    let [data,updateData]=useState({title:"",isbn:"",numberOfCopies:0})
    let [error,setError]=useState("");
    
    useEffect(()=>{
         axios.get("http://localhost:8181/api/books/"+id)
    .then((response)=>{

        console.log(response.data);
        
        updateData({title:response.data.title,isbn:response.data.isbn,numberOfCopies:response.data.numberOfCopies});
    })
    .catch((err)=>{
        setError(error=err);
    })
    },[]);

    async function hadleEditBook(){
        const response=await fetch("http://localhost:8181/api/books/edit/"+id,{
        method:"PUT",
        headers:{"Content-Type": "application/json" },
        body:JSON.stringify(data),
    });
  
    if (response.ok) {
        alert("updated Successfully");
        navigate("/books")
    }
    else{
        alert("Failed");
    }
    }

    return (
    <>
  <div className="editbook-container mx-auto mt-5 w-50 p-5 shadow rounded">
    <h1 className="editbook-title display-4 mb-4 text-center">Edit Book</h1>

    <div className="editbook-form d-flex flex-column gap-4">
      <input
        type="text"
        className="editbook-input form-control"
        placeholder="Title"
        value={data.title}
        onChange={(e) => updateData({ ...data, title: e.target.value })}
      />

      <input
        type="text"
        className="editbook-input form-control"
        placeholder="ISBN"
        value={data.isbn}
        onChange={(e) => updateData({ ...data, isbn: e.target.value })}
      />

      <input
        type="number"
        className="editbook-input form-control"
        placeholder="Copies"
        value={data.numberOfCopies}
        onChange={(e) => updateData({ ...data, numberOfCopies: e.target.value })}
      />

      <button className="editbook-btn btn btn-primary align-self-center px-5" onClick={hadleEditBook}>
        Save Changes
      </button>
    </div>
  </div>
</>

  )
}
