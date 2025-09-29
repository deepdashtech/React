import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { timeAgo } from '../utility/timeAgo';
import daysRemaining from '../utility/daysRemaining';

export const ProfileUser = () => {
  let [userdata, setUserdata] = useState({
    userId: 0,
    userName: "",
    userType: "",
    booksBorrowed: 0,
  });

  let [historydata, setHistoryData] = useState([]);

  let userId = Number(localStorage.getItem("userid"));
  console.log(userId);
  

  useEffect(() => {
    let username = localStorage.getItem("username");
    axios
      .get("http://localhost:8181/api/users/user/" + username)
      .then((response) => {
        const userData = response.data.data;
        setUserdata({
          userId: userData.userId,
          userName: userData.userName,
          userType: userData.userType,
          booksBorrowed: userData.booksBorrowed,
        });

        // Use returned userId from user data, not from localStorage
        axios.get("http://localhost:8181/api/borrow/history/" + userData.userId)
          .then((borrowedResponse) => {
            setHistoryData(borrowedResponse.data.data);
          })
          .catch(() => alert("Borrow history not found"));
      })
      .catch(() => alert("User data not found"));
  }, []);

  // Debug: Log historydata whenever it changes
  useEffect(() => {
    console.log("History data updated:", historydata);
  }, [historydata]);

  function historyHandle() {
    // Optional: implement if clicking on booksBorrowed stat does something
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
          {historydata.map((element, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{element.book.title}</td>
              <td>{element.book.author}</td>
              <td>{timeAgo(element.issueDate)}</td>
              <td>
                {element.returnDate == null
                  ? <span style={{ color: 'red' }}>Not Returned</span>
                  : <span>{daysRemaining(element.returnDate)}</span>}
              </td>
              <td>{daysRemaining(element.dueDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
