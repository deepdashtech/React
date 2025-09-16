import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { timeAgo } from '../utility/timeAgo';
import daysRemaining from '../utility/daysRemaining';



export const ProfileUser = () => {
  let [userdata, setuserdata] = React.useState({
    userId: 0,
    userName: "",
    userType: "",
    booksBorrowed: 0,
  });

  let [historydata,setHistoryData]=useState([]);

  let userId = Number(localStorage.getItem("userid"));


  React.useEffect(() => {
    let username = localStorage.getItem("username");
    axios
      .get("http://localhost:8181/api/users/user/" + username)
      .then((response) => {
        setuserdata({
          userId: response.data.data.userId,
          userName: response.data.data.userName,
          userType: response.data.data.userType,
          booksBorrowed: response.data.data.booksBorrowed,
        });

         axios.get("http://localhost:8181/api/borrow/history/" + userId)
          .then((borrowedResponse) => {
            console.log(borrowedResponse.data);
            setHistoryData(borrowedResponse.data.data);
            console.log(historydata);
            
          })
          .catch(()=>alert("Not Found"));
      })
      .catch((err) => {
        // handle error if needed
      });
  }, []);

  function historyHandle()
  {
   
  }

  return (
    <>
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-name">{userdata.userName}</h1>
        <p className="profile-type">{userdata.userType}</p>
      </header>

      <section className="profile-stats-section">
        <div className="stat-item">
          <span className="stat-label">User ID</span>
          <span className="stat-value">{userdata.userId}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Books Borrowed</span>
          <span className="stat-value" onClick={historyHandle}>{userdata.booksBorrowed}</span>
        </div>
      </section>
    </div>
      <table className='table table-hover table-striped w-50 mx-auto container'>
          <thead>
            <tr>
              <td>Index</td>
              <td>Title</td>
              <td>Author</td>
              <td>Issue Date</td>
              <td>Return Date</td>
              <td>Due Date</td>
            </tr>
          </thead>
          <tbody>
            {/* <tr> */}
              {
                historydata.map((element,idx=1)=>{
                  return(
                    <tr key={idx}>
                      <td>{idx+1}</td>
                      <td>{element.book.title}</td>
                      <td>{element.book.author}</td>
                      <td>{timeAgo(element.issueDate)}</td>
                     <td>
                        {element.returnDate == null 
                          ? <span style={{ color: 'red' }}>Not Returned</span> 
                          : daysRemaining(element.returnDate)
                        }
                      </td>
                      <td>{daysRemaining(element.dueDate)}</td>
                      {/* <td>{element.book.title}</td> */}
                    </tr>
                  )
                })
              }
            {/* </tr> */}
          </tbody>
      </table>
              </>
  );
};
