import React, { useContext, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import { LoginContext } from '../Context/LoginContext';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css'
import { toast, ToastContainer } from 'react-toastify';
import bg from '../assets/loginbg.jpg';

export const Login = () => {

  let {logged,login}=useContext(LoginContext);
  let navigate=useNavigate();

    let [username, setUsername] = useState("");
    let [password,setpassword]=useState("");
    let [usertype,setusertype]=useState("Admin");


//   let {data,loading,error}=useFetch("http://localhost:8181/api/auth/login");

  const hadleLogin= async(e)=>{
    e.preventDefault();
   const response = await fetch("http://localhost:8181/api/auth/login", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ username, password, usertype }),
});

    let data=await response.json();
    if (response.ok) {
      console.log(data);
      
        toast("Login successfully");
        login();
        // console.log(data.user.userId);
        
        console.log(data);
        
        localStorage.setItem("username",data.data.userName);
        localStorage.setItem("userid",data.data.userId);
        localStorage.setItem("usertype",data.data.userType);
        navigate("/home");
    }
    else{
        console.log(data);
        
        toast(data.message);
    }
  }
  
    return (
      <div className='' style={{backgroundImage:bg}}>

      <form className='mx-5 row mx-auto  m-5 w-75 borderDarkBlue borderRadius' style={{backgroundImage:bg}} onSubmit={hadleLogin}>

         <ToastContainer  position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      

          <div className='col-7 d-flex flex-column justify-content-center  align-items-center gap-3 p-5 colorDarkBlue' >
          <h1 className='display-3'>Login</h1>
      <br></br>
          <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} ></input>

          <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} ></input>

          <select className='form-control' placeholder="UserType" onChange={(e)=>setusertype(e.target.value)}>
            <option value={"Admin"}>Admin</option>
            <option value={"User"}>User</option>
          </select>


          <p className='colorDarkBlue'>Don't Have Account? <NavLink to={"/signup"} className={"colorDarkBlue removelink"}>Signup</NavLink></p>


          <button className='btn btn-outline-dark px-5' type='submit'>Login</button>
        </div>

        <div className='col d-flex flex-column justify-content-center align-items-center loginBeside'>
            
            <p className='fs-1 m-5'>
              
              "Books are a uniquely portable magic." <br /><br />— Stephen King
            </p>
            
        </div>
      </form>
        </div>
  )
}
