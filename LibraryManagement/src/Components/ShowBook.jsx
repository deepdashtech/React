import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import book2pic from '../assets/book3.avif';


export const ShowBook = () => {
  let { id } = useParams();

  let [data, updateData] = useState({ title:"", isbn:"", numberOfCopies:0, author:"",createdOn:""});
  let [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8181/api/books/" + id)
      .then((response) => {
        console.log(response.data);
        
        updateData({
          title: response.data.title,
          isbn: response.data.isbn,
          numberOfCopies: response.data.numberOfCopies,
          author: response.data.author,
          createdOn: timeAgo(response.data.createdOn)
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);



  function timeAgo(dateString) {

      if (!dateString) {
    return "not added";
  }

  const date = new Date(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now - date) / 1000);
  if (secondsAgo < 60) return secondsAgo + " seconds ago";

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return minutesAgo + " minutes ago";

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return hoursAgo + " hours ago";

  const daysAgo = Math.floor(hoursAgo / 24);
  return daysAgo + " days ago";
}

  return (
    <div className="book-details-page mt-5 py-5 mx-auto">
  <div className="row justify-content-center align-items-center">
    <div className="col-md-4 d-flex justify-content-center align-items-start">
      <img
        src={book2pic}
        alt={data.title}
        className="book-details-img"
      />
    </div>
    <div className="col-md-6 ps-md-5 pt-3 pt-md-0">
      <h1 className="book-details-title fw-bold text-uppercase mb-3">{data.title}</h1>
      <p className="book-details-author mb-2 fs-5"><i>By {data.author}</i></p>
      <br></br>
      <p className="book-details-isbn text-muted mb-4">ISBN: <b>{data.isbn}</b></p>
      <p className='book-details-isbn text-muted mb-4'>Added: {data.createdOn}</p>
      <div className="mb-4">
        {data.numberOfCopies > 0 ? (
          <span className="badge bg-success fs-5 px-4 py-2">Copies Available: {data.numberOfCopies}</span>
        ) : (
          <span className="badge bg-danger fs-5 px-4 py-2">Out Of Stock</span>
        )}
      </div>
      {/* Extra: Add Borrow button or description here */}
    </div>
  </div>
</div>

  )
}
