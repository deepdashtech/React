import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Categories } from '../utility/Categories';


export const AddBook = () => {
  
    let navigate=useNavigate();

    let [title,settitle]=useState("");
    let [isbn,setisbn]=useState("");
    let [category,setCategory]=useState("");
    let [numberOfCopies,setcopies]=useState(); 
    let [author,setauthor]=useState("");
    let [imagepath,setImagePath]=useState(null);

    let bookCategories = Categories;

     const hadleAddBook=async(e)=>{

      const bookDto={
        title:title,
        isbn:isbn,
        numberOfCopies:numberOfCopies,
        author:author,
        category:category
      }

      const formData=new FormData();
      formData.append("book",new Blob([JSON.stringify(bookDto)],{type:"application/json"})
    );
    formData.append("image",imagepath);
    
    
    try{
      await axios.post("http://localhost:8181/api/books/add",formData);
      
      alert("added Successfully");
      navigate("/books") 
  }
    catch(err)
    {
      alert("Failed");
    }  
    }

    function handleFileChange(e)
    {
      setImagePath(e.target.files[0]);
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

      <select value={category} className='form-control addbook-input' onChange={(e)=>setCategory(e.target.value)}>
        {
          bookCategories.map((cat)=>{
            return(
              <option key={cat} value={cat}>{cat}</option>
            )
          })
        }
      </select>

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

      <input type='file' accept='image/*' onChange={handleFileChange} required></input>



      <button className="addbook-btn btn btn-primary align-self-center px-5" onClick={hadleAddBook}>
        Add Book
      </button>
    </div>
  </div>
</>

  )
}
