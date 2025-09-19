import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import defaultimg from '../assets/default-book.png';
import { Categories } from '../utility/Categories';

export const BookList = () => {
  let navigate = useNavigate();
  let userType = localStorage.getItem("usertype")?.toLowerCase() || "";
  let userId = Number(localStorage.getItem("userid"));

  let [search, setSearch] = useState("");
  let [category, setCategory] = useState("All");
  let [allBooks, setAllBooks] = useState([]);
  let [books, setBooks] = useState([]);
  let [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetch books and borrowed books data (on mount)
  useEffect(() => {
    axios.get("http://localhost:8181/api/books/all")
      .then((booksResponse) => {
        axios.get("http://localhost:8181/api/borrow/" + userId)
          .then((borrowedResponse) => {
            const borrowed = borrowedResponse.data.data;
            const booksWithBorrowFlag = booksResponse.data.data.map(book => ({
              ...book,
              isBorrowed: borrowed.some(borrowedBook => borrowedBook.book.bookId === book.bookId)
            }));
            setAllBooks(booksWithBorrowFlag); // keep the original
            console.log(allBooks);
            
            setBorrowedBooks(borrowed);
            console.log(borrowedBooks);
            
          })
          .catch(() => alert("Failed to fetch borrowed books"));
      })
      .catch(() => alert("Failed to fetch books"));
  }, [userId]);

  // Filter books whenever search/category/allBooks change
 useEffect(() => {
  let filtered = allBooks;
  console.log("filtered");
  
  console.log(filtered);
  
  if (search !== "") {
    filtered = filtered.filter((book) =>
      
      book.title && book.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if ( category !== "All") {
    filtered = filtered.filter((book) =>book.category == category);
  }

  setBooks(filtered);
  console.log("Filtered books count:", filtered.length);
}, [search, category, allBooks]);

  // Delete a book along with its image (handled backend)
  async function deleteHandle(e, id) {
    e.stopPropagation();
    if (window.confirm("Are You Sure?")) {
      const response = await fetch("http://localhost:8181/api/books/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        toast("Deleted Successfully");
        setAllBooks((prev) => prev.filter((book) => book.bookId !== id));
      } else {
        toast("Failed to delete");
      }
    }
  }

  // Borrow book action
  async function borrowBookHandle(e, bookId) {
    e.stopPropagation();

    const response = await fetch("http://localhost:8181/api/borrow/bookborrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, userId }),
    });

    if (response.ok) {
      toast("Borrowed Successfully");
      // Refetch all books and borrowed list after borrowing
      axios.get("http://localhost:8181/api/books/all")
        .then((booksResponse) => {
          axios.get("http://localhost:8181/api/borrow/" + userId)
            .then((borrowedResponse) => {
              const borrowed = borrowedResponse.data.data;
              const booksWithBorrowFlag = booksResponse.data.data.map(book => ({
                ...book,
                isBorrowed: borrowed.some(borrowedBook => borrowedBook.book.bookId === book.bookId)
              }));
              setAllBooks(booksWithBorrowFlag);
              setBorrowedBooks(borrowed);
            });
        });
    } else {
      toast("Failed to borrow book");
    }
  }

  // Navigation handlers
  function EditHandle(e, id) {
    e.stopPropagation();
    navigate("/edit/" + id);
  }

  function showBookHandle(e, id) {
    e.stopPropagation();
    navigate("/book/" + id);
  }

  function AddBook() {
    navigate("/addbook");
  }

  // Handle image load error fallback
  function handleImageError(e) {
    e.target.src = defaultimg;
  }

  return (
    <div className='container mt-5 justify-content-center align-items-center gap-3 w-100 mb-5 pb-5'>
      <ToastContainer
        position="top-right"
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
        <input
          className='form-control w-50'
          placeholder='Search Book'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className='addbook-input'>
          <option value={"All"}>All</option>
          {Categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {userType === "admin" && (
          <button className='btn btn-outline-dark' onClick={AddBook}>
            + Add Book
          </button>
        )}
      </div>

      <div className='d-flex flex-column gap-5'>
        <div><b className='LucidaSansFont'>All Books</b></div>
        <div className='DisplayGrid4 gap-5 '>
          {books.map((book) => (
            <div
              className='shadow card w-100 d-flex flex-column justify-content-center align-items-center custcard'
              key={book.bookId}
              onClick={(e) => showBookHandle(e, book.bookId)}
            >
              <img
                src={book.imagePath ? `http://localhost:8181${book.imagePath}` : defaultimg}
                className='w-100 p-3'
                height={"200px"}
                alt={book.title}
                onError={handleImageError}
              />
              <p className='my-2 LucidaSansFont text-secondary fs-4'>{book.title}</p>

              {userType === "admin" ? (
                <div className='d-flex flex-row justify-content-between align-items-center gap-2 my-3'>
                  <button
                    className='btn btn-secondary w-100 px-4'
                    onClick={(e) => EditHandle(e, book.bookId)}
                  >
                    EDIT
                  </button>
                  <button
                    className='btn btn-danger px-4'
                    onClick={(e) => deleteHandle(e, book.bookId)}
                  >
                    Delete
                  </button>
                </div>
              ) : book.isBorrowed ? (
                <i className='text-secondary my-2'>Already Borrowed</i>
              ) : book.numberOfCopies > 0 ? (
                <button
                  className='btn rounded rounded-0 w-100 btndesign'
                  onClick={(e) => borrowBookHandle(e, book.bookId)}
                >
                  Borrow
                </button>
              ) : (
                <i className='text-danger my-2'>Out Of Stock</i>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
