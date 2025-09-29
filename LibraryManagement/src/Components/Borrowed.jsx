import axios from 'axios';
import React, { useEffect, useState } from 'react';
import book2pic from '../assets/book3.avif';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { timeAgo } from '../utility/timeAgo';
import daysRemaining from '../utility/daysRemaining';
import defaultimg from '../assets/default-book.png';





export const Borrowed = () => {
  let userId = Number(localStorage.getItem("userid"));
  let [Borrowedbooks, setBooks] = useState([]);

  let navigate=useNavigate();


 

  useEffect(() => {
    axios.get("http://localhost:8181/api/borrow/" + userId)
      .then((response) => {
        setBooks(response.data.data)
        console.log( "response data");
        
        console.log(response.data);
        
      })
      .catch((err) => alert("not found"))

      // console.log(books);
      
  }, []);

  async function ReturnBookHandle(e, bookId) {
    e.stopPropagation();
    if (confirm("Are you really want to return?")) {
      const response = await fetch(
        `http://localhost:8181/api/borrow/return?userId=${userId}&bookId=${bookId}`);
      if (response.ok) {
        // alert("Deleted successfully");
        toast("Returned")
        axios.get(`http://localhost:8181/api/borrow/${userId}`)
          .then((response) => setBooks(response.data.data))
          .catch(() => alert("Failed to refresh borrowed books"));
      } else if (response.status === 404) {
        alert("Record not found");
      } else {
        alert("Delete failed");
      }
    }
  }

  function showBookHandle(e, id) {
    e.stopPropagation();
    // optional navigation logic here
    navigate("/book/" + id);
  }

  function gotoPDF(e,id){
    e.stopPropagation();
    navigate("/showpdf/"+id);
  }

  return (
    <div className='container mt-5 justify-content-center align-items-center gap-3 w-100'>
      <ToastContainer  position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


      <div className='d-flex flex-column gap-5'>
        <div>
          <b className='LucidaSansFont'>Your Books</b>
        </div>
        <div className='DisplayGrid4 gap-5'>
          {
            Borrowedbooks.map((book) => (
              <>
              <div className='shadow card w-100 d-flex flex-column justify-content-center align-items-center custcard' key={book.book.bookId} onClick={(e) => showBookHandle(e, book.book.bookId)}>
                <img src={book.book.imagePath?`http://localhost:8181${book.book.imagePath}`:defaultimg} height={"200px"} alt="Book cover" className='w-100 p-3' />
                <h1 className='fs-4 my-2'>{book.book.title}</h1>
                <p className='fst-italic text-secondary mb-3'>ISBN: {book.book.isbn}</p>
                <p className='fst-italic text-secondary mb-3'>Borrowed : {timeAgo(book.issueDate)}</p>
                <p className='fst-italic text-secondary mb-3'>Due Date : {daysRemaining(book.dueDate)}</p>

                <button className='btn btn-outline-dark' onClick={(e)=>gotoPDF(e,book.book.bookId)}>Read</button><br></br>

                <button className='btn rounded rounded-0 w-100 btndesign' onClick={(e) => ReturnBookHandle(e, book.book.bookId)}>Return</button>
              </div>
              
              </>
            ))
          }
        </div>
      </div>
              
    </div>
  )
}
