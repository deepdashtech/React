import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {

  let navigate=useNavigate();

  let username=localStorage.getItem("username");
  let [MostBorrowedBooks,setMostBorrowedBooks]=useState([]);
  let [newBooks,setNewBooks]=useState([]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(()=>{
    axios.get("http://localhost:8181/api/borrow/mostBorrowed")
    .then((response)=>{
        // console.log(response.data.data);
        setMostBorrowedBooks(response.data.data);
        // console.log(MostBorrowedBooks);
                
    })
.catch(()=>{
  console.log("failed");
})


  axios.get("http://localhost:8181/api/books/newlyadded")
  .then((response)=>{
    console.log(response.data.data);
    
    setNewBooks(response.data.data);
    console.log(newBooks);
    
  })
  .catch(()=>{
    console.log("Failed");
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
        <div className=' py-5 w-100 bg-warning px-5 w-100'>
  <div><h2 className='LucidaSansFont picfont mx-5'>Newly Added</h2></div>
        <div className='container px-0 my-large-slider px-5'>
  <Slider {...settings} >
    {newBooks.map((item) => (
      <div className='py-4' key={item.bookId} onClick={(e) => showBookHandle(e, item.bookId)}>
        <img
          src={`http://localhost:8181${item.imagePath}`}
          alt={item.title}
          style={{
            height: "360px",
            maxWidth: "480px",
            objectFit: "contain",
            margin: "0 auto",
            display: "block",
            borderRadius: "14px"
          }}
        />
        <div
          className='text-center mt-1 book-details-author fs-1'
          style={{ fontSize: "2.5rem" }}
        >
          {item.title?.toUpperCase()}
        </div>

        <div className='book-details-author mb-2 fs-5 text-center'>
          <i>By {item.author}</i>
        </div>
      </div>
    ))}
  </Slider>
</div>


</div>



    </div>
  )
}
