import React from 'react'
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {
  let {data,loading,error}=useFetch("http://localhost:8181/api/users/all");
  
  let navigate=useNavigate();

  function showuser(id)
  {
    navigate("user/"+id);
  }
  
    return (
    <div className='container mt-5 d-flex flex-column justify-content-center gap-3 w-100 mb-5 pb-5'>
      <h1 className='fs-1 colorDarkBlue TimesNewRomanFont'>User List</h1>
       {
  data.map((user) => {
    return (
      (user.userType && user.userType.toLowerCase() === "user") ?
        <div className='shadow card w-100 usercard' key={user.userId} onClick={() => showuser(user.userId)}>
          <div className='usercard-content'>
            <h1>Username : {user.userName}</h1>
            <p>Usertype : {user.userType}</p>
            <b>Books Borrowed : {user.booksBorrowed}</b>
          </div>
        </div>
      : null
    )
  })
}
    </div>
  )
}
