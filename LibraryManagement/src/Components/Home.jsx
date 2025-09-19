import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  let navigate=useNavigate();

  let username=localStorage.getItem("username");
  let [MostBorrowedBooks,setMostBorrowedBooks]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8181/api/borrow/mostBorrowed")
    .then((response)=>{
        // console.log(response.data.data);
        setMostBorrowedBooks(response.data.data);
        console.log(MostBorrowedBooks);
                
    })
.catch(()=>{
  console.log("failed");
})


  },[]);



  function showBookHandle(e,bookId)
  {
     e.stopPropagation();
      navigate("/book/" + bookId);
  }


  return (
    <div className='container mx-auto border d-flex flex-column justify-content-center align-items-center mt-5 shadow mb-5'>
      
      <div className='backgroundimage row px-5' >
        {/* <img src="" /> */}
        {/* <img src=''></img> */}

        <p className='col-5 display-1 px-5 mx-5 picfont h-100 py-5 my-5' >A SOFA,
        A GOOD BOOK,
        AND YOU.</p>
      </div>
        {/* <p className='colorDarkBlue display-1'>Welcome! {username}</p> */}


      <div className='d-flex flex-column gap-2 py-5'>
        <div><h2 className='LucidaSansFont text-secondary'>Most Picked</h2></div>
        <div className='DisplayGrid4 gap-5 d-flex '>
        {
          MostBorrowedBooks.map((book)=>{
              return <div
                          className='shadow card w-100 d-flex flex-column justify-content-center align-items-center custcard'
                          key={book.bookId}
                          onClick={(e) => showBookHandle(e, book.bookId)}
                        >
                          <img
                            src={book.imagePath ? `http://localhost:8181${book.imagePath}` : defaultimg}
                            className='w-100 p-3'
                            height={"200px"}
                            alt={book.title}
                            // onError={handleImageError}
                          />
                          <p className='my-2 LucidaSansFont text-secondary fs-4'>{book.title}</p>

                          <p className="book-details-author mb-2 fs-5"><i>By {book.author}</i></p>
                </div>
          })
        }
      </div>
      </div>


    </div>
  )
}
