import axios from 'axios';
import React, { useEffect, useState } from 'react'



export const ProfileUser = () => {
  let [userdata, setuserdata] = React.useState({
    userId: 0,
    userName: "",
    userType: "",
    booksBorrowed: 0,
  });

  React.useEffect(() => {
    let username = localStorage.getItem("username");
    axios
      .get("http://localhost:8181/api/users/user/" + username)
      .then((response) => {
        setuserdata({
          userId: response.data.userId,
          userName: response.data.userName,
          userType: response.data.userType,
          booksBorrowed: response.data.booksBorrowed,
        });
      })
      .catch((err) => {
        // handle error if needed
      });
  }, []);

  return (
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
          <span className="stat-value">{userdata.booksBorrowed}</span>
        </div>
      </section>
    </div>
  );
};
