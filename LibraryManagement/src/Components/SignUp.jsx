import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';
import { toast, ToastContainer } from 'react-toastify';

export const SignUp = () => {
  let [username, setusername] = useState("");
  let [password, setpassword] = useState("");
  let [usertype, setusertype] = useState("");
  let { logged, login, logout } = useContext(LoginContext);
  let navigate = useNavigate();

  const validate = () => {
    if (username.length < 6) {
      toast.error("Username must be at least 6 characters");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character");
      return false;
    }
    return true;
  };

  const hadleSignup = async (e) => {
    if (!validate()) return; // If validation fails, stop here

    const response = await fetch("http://localhost:8181/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, usertype }),
    });

    let data = await response.json();
    if (response.ok) {
      toast("Signup Successfully");
      login();
      console.log(response.json);
      
      console.log(data);
      
      localStorage.setItem("username", data.data.userName);
      localStorage.setItem("userid", data.data.userId);
      localStorage.setItem("usertype", data.data.userType);
      navigate("/home");
    }
    else {
      toast("Failed");
    }
  };

  return (
    <div className='mx-5 row mx-auto m-5 w-75 borderDarkBlue borderRadius'>
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
      <div className='col-7 d-flex flex-column justify-content-center align-items-center gap-3 p-5 colorDarkBlue'>
        <h1 className='display-3'>Sign-up</h1>
        <br />
        <input
          type='text'
          className='form-control'
          placeholder='Username'
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <select
          className='form-control'
          value={usertype}
          onChange={(e) => setusertype(e.target.value)}
          placeholder="UserType"
        >
          <option value={"Admin"}>Admin</option>
          <option value={"User"}>User</option>
        </select>

        <p className='colorDarkBlue'>
          Already Have Account?{" "}
          <NavLink to={"/"} className={"colorDarkBlue removelink"}>Login</NavLink>
        </p>

        <button className='btn btn-outline-dark px-5' onClick={hadleSignup}>
          Sign Up
        </button>
      </div>
      <div className='col d-flex flex-column justify-content-center align-items-center loginBeside'>
        <p className='fs-1 m-5'>
          "Books are a uniquely portable magic." <br /><br />— Stephen King
        </p>
      </div>
    </div>
  )
}
