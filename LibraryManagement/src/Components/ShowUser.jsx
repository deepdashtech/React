import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ShowUser = () => {
  let { id } = useParams();
  let [userdata, setuserdata] = useState({ userId: 0, userName: "", userType: "", booksBorrowed: 0 });

  useEffect(() => {
    axios.get("http://localhost:8181/api/users/userid/" + id)
      .then((response) => {
        setuserdata({
          userId: response.data.data.userId,
          userName: response.data.data.userName,
          userType: response.data.data.userType,
          booksBorrowed: response.data.data.booksBorrowed
        });
      })
      .catch((err) => {
        // handle error if needed
      });
  }, [id]);

  return (
  <div className="user-profile-page container mt-5 mb-5">
    <header className="user-profile-header mb-4">217891
      <h1 className="user-profile-title">User Profile</h1>
    </header>

    <section className="user-profile-info p-4 user-profile-bg rounded shadow-sm">
      <div className="user-profile-row">
        <label className="user-profile-label">Username:</label>
        <span className="user-profile-value">{userdata.userName}</span>
      </div>

      <div className="user-profile-row">
        <label className="user-profile-label">User ID:</label>
        <span className="user-profile-value">{userdata.userId}</span>
      </div>

      <div className="user-profile-row">
        <label className="user-profile-label">User Type:</label>
        <span className="user-profile-value">{userdata.userType}</span>
      </div>

      <div className="user-profile-row">
        <label className="user-profile-label">Books Borrowed:</label>
        <span className="user-profile-value">{userdata.booksBorrowed}</span>
      </div>
    </section>
  </div>
);

}
