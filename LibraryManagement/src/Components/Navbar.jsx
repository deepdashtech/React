import React, { useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LoginContext } from '../Context/LoginContext'
import logo from '../assets/icons8-book.gif'

export const Navbar = () => {

    // let {logged}=useContext(LoginContext);

    let {logout}=useContext(LoginContext);

    let navigate=useNavigate();

    let currlocation=useLocation();

    if(currlocation.pathname=="/" || currlocation.pathname=="/signup")
    {
        return  <div className='container mx-auto d-flex flex-row justify-content-between align-items-center mt-5 py-1'>
        <div className='d-flex flex-row '>
            <img src={logo} className='px-3'></img>
            <div className='text-light fs-3 col-6 px-3 backDarkBlue borderDarkBlue' >DEEEEP</div>
            <div className='col fs-3 px-3 textDarkBlue borderDarkBlue'>Library</div>
        </div>
        <div></div>
        </div>;
    }

    function loggingOut()
    {
        if(confirm("Are You Sure?"))
        {
            logout();
            navigate("/");
        }
    }

    let usertype=localStorage.getItem("usertype").toLowerCase();
    console.log(usertype);
    

  return (
    <div className='container mx-auto d-flex flex-row justify-content-between align-items-center  mt-5 py-1'>
        {/* <div className='d-flex flex-row justify-content-between align-items-center'> */}
                {/* <h1>Logo</h1> */}
                {/* <img src='https://img.icons8.com/?size=100&id=OJFpDSSbtTnY&format=png&color=ffffff' width={"50px"} height={"50px"}></img> */}
                {/* <img src='../assets\icons8-book.gif'></img> */}
                {/* <i style={{fontStyle:"Cursive"}}>Library <sup>Manage</sup> </i> */}
            
            <NavLink to={"/home"} className='d-flex flex-row justify-content-between align-items-center removelink'>
                <img src={logo} className='px-3'></img>
                <div className='text-light fs-3 col-6 px-3 backDarkBlue borderDarkBlue' >DEEEEP</div>
                <div className='col fs-3 px-3 textDarkBlue borderDarkBlue'>Library</div>
            </NavLink>

               
        {/* </div> */}
        
        <div className='d-flex flex-row gap-5 justify-content-between align-items-center'>
            
                <NavLink className='removelink colorDarkBlue centuryGothicFont' to={"/books"}>
                    Books
                </NavLink> 
                

                {usertype=="admin"?
                <NavLink className='removelink colorDarkBlue' to={"/userlist"}>
                    Users
                </NavLink> :
                <NavLink className='removelink colorDarkBlue' to={"/borrowed"}>
                    MyBookshelf
                </NavLink> 
            }
            <NavLink className='removelink colorDarkBlue' to={"/profile"}>
                    Profile
                </NavLink> 
            <button className='btn editbtn px-5' onClick={loggingOut}>Logout</button>
        </div>
    </div>
  )
}
