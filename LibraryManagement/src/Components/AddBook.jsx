import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddBook = () => {
  
    let navigate=useNavigate();

    let [title,settitle]=useState("");
    let [isbn,setisbn]=useState("");
    let [numberOfCopies,setcopies]=useState(); 
    let [author,setauthor]=useState("");

     const hadleAddBook=async(e)=>{
   const response=await fetch("http://localhost:8181/api/books/add",{
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body:JSON.stringify({title,isbn,numberOfCopies,author}),
    });
  
    if (response.ok) {
        alert("added Successfully");
        navigate("/books")
    }
    else{
        alert("Failed");
    }
    }
  
  
    return (
    <>
  <div className="addbook-container mx-auto mt-5 w-50 p-5 rounded shadow">
    <h1 className="addbook-title display-4 mb-4 text-center">Add Book</h1>

    <div className="addbook-form d-flex flex-column gap-4">
      <input
        type="text"
        className="addbook-input form-control"
        placeholder="Title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />

      <input
        type="text"
        className="addbook-input form-control"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setisbn(e.target.value)}
      />

      <input
        type="number"
        className="addbook-input form-control"
        placeholder="Copies"
        value={numberOfCopies}
        onChange={(e) => setcopies(e.target.value)}
      />

      <input
        type="text"
        className="addbook-input form-control"
        placeholder="Author"
        value={author}
        onChange={(e) => setauthor(e.target.value)}
      />

      <button className="addbook-btn btn btn-primary align-self-center px-5" onClick={hadleAddBook}>
        Add Book
      </button>
    </div>
  </div>
</>

  )
}
