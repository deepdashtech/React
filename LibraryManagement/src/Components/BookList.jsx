import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import book2pic from '../assets/book3.avif';
import "../App.css"
import { toast, ToastContainer } from 'react-toastify';



export const BookList = () => {
  let navigate = useNavigate();
  let userType = localStorage.getItem("usertype").toLowerCase();
  let userId = Number(localStorage.getItem("userid"));

  let [search, setSearch] = useState("");
  let [books, setBooks] = useState([]);
  let [borrowedBooks, setBorrowedBooks] = useState([]);

  // Extracted fetch logic to reuse
  const fetchBooksAndBorrowed = () => {
    axios.get("http://localhost:8181/api/books/all")
      .then((booksResponse) => {
        axios.get("http://localhost:8181/api/borrow/" + userId)
          .then((borrowedResponse) => {
            const borrowed = borrowedResponse.data;
            const booksWithBorrowFlag = booksResponse.data.map(book => ({
              ...book,
              isBorrowed: borrowed.some(borrowedBook => borrowedBook.bookId === book.bookId)
            }));
            console.log(booksWithBorrowFlag);
            
            setBooks((books)=>books=booksWithBorrowFlag);
            // console.log(books);
            console.log(books);
            
            
            setBorrowedBooks(borrowed);
          })
          .catch(() => alert("Failed to fetch borrowed books"));
      })
      .catch(() => alert("Failed to fetch books"));
  };

  useEffect(() => {
    if (search === "") {
      fetchBooksAndBorrowed();
    } else {
      setBooks((books) => books.filter((e) => e.title && e.title.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search]);

  async function deleteHandle(e, id) {
    e.stopPropagation();
    if (confirm("Are You Sure?")) {
      const response = await fetch("http://localhost:8181/api/books/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        toast("Deleted Successfully");
        // alert("Successfully deleted");
        setBooks((prev) => prev.filter((book) => book.bookId !== id));
      } else {
        toast("Failed to delete");
      }
    }
  }

  async function borrowBookHandle(e, bookId) {
    e.stopPropagation();
      console.log("BooID: "+bookId);
      console.log("UserID: "+userId);
      
      
    const response = await fetch("http://localhost:8181/api/borrow/bookborrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, userId }),
    });

    if (response.ok) {
      toast("Borrowed Successfully");
      fetchBooksAndBorrowed();  // Refresh books and borrow flags after borrowing
    } else {
      toast("Failed to borrow book");
    }
  }

  function EditHandle(e, id) {
    e.stopPropagation();
    navigate("/edit/" + id);
  }

  function showBookHandle(e, id) {
    console.log("id:"+id);
    
    e.stopPropagation();
    navigate("/book/" + id);
  }

  function AddBook() {
    navigate("/addbook");
  }

  return (
    <div className='container mt-5 justify-content-center align-items-center gap-3 w-100 mb-5 pb-5'>
      

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


      
      <div className='d-flex flex-row justify-content-between px-5 align-items-center mb-5'>
        <input className='form-control w-50' placeholder='Search Book' value={search} onChange={(e) => setSearch(e.target.value)} />
        {
          userType === "admin" &&
          <button className='btn btn-outline-dark' onClick={AddBook}>+ Add Book</button>
        }
      </div>
      <div className='d-flex flex-column gap-5'>
        <div><b className='LucidaSansFont'>All Books</b></div>
        <div className='DisplayGrid4 gap-5'>
          {
            books.map((book) => (
              <div className='shadow card w-100 d-flex flex-column justify-content-center align-items-center custcard'  key={book.bookId} onClick={(e) => showBookHandle(e, book.bookId)}>
                <img src={book2pic} height={"200px"} alt="Book" />
                <p className='my-2 LucidaSansFont text-secondary fs-4'>{book.title}</p>

                {userType === "admin" ? (
                  <div className='d-flex flex-row justify-content-between align-items-center gap-2 my-3'>
                    <button className='btn btn-secondary w-100 px-4' onClick={(e) => EditHandle(e, book.bookId)}>EDIT</button>
                    <button className='btn btn-danger px-4' onClick={(e) => deleteHandle(e, book.bookId)}>Delete</button>
                  </div>
                ) : (
                  book.isBorrowed ?
                    <i className='text-secondary my-2'>Already Borrowed</i>
                    :
                    book.numberOfCopies > 0 ?
                      <button className='btn rounded rounded-0 w-100 btndesign' onClick={(e) => borrowBookHandle(e, book.bookId)}>Borrow</button>
                      :
                      <i className='text-danger my-2'>Out Of Stock</i>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
