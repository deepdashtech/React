import axios from 'axios';
import React, { useEffect, useState } from 'react';
import book2pic from '../assets/book3.avif';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export const Borrowed = () => {
  let userId = Number(localStorage.getItem("userid"));
  let [books, setBooks] = useState([]);

  let navigate=useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8181/api/borrow/" + userId)
      .then((response) => setBooks(response.data))
      .catch((err) => alert("not found"))
  }, []);

  async function ReturnBookHandle(e, bookId) {
    e.stopPropagation();
    if (confirm("Are you really want to return?")) {
      const response = await fetch(
        `http://localhost:8181/api/borrow/delete?userId=${userId}&bookId=${bookId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      if (response.ok) {
        // alert("Deleted successfully");
        toast("Returned")
        axios.get(`http://localhost:8181/api/borrow/${userId}`)
          .then((response) => setBooks(response.data))
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
            books.map((book) => (
              <div className='shadow card w-100 d-flex flex-column justify-content-center align-items-center custcard' key={book.bookId} onClick={(e) => showBookHandle(e, book.bookId)}>
                <img src={book2pic} height={"200px"} alt="Book cover" />
                <h1 className='fs-4 my-2'>{book.title}</h1>
                <p className='fst-italic text-secondary mb-3'>ISBN: {book.isbn}</p>
                <button className='btn rounded rounded-0 w-100 btndesign' onClick={(e) => ReturnBookHandle(e, book.bookId)}>Return</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
