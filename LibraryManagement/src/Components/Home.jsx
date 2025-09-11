import React from 'react'

export const Home = () => {

  let username=localStorage.getItem("username");

  return (
    <div className='container mx-auto border d-flex flex-column justify-content-center align-items-center mt-5 shadow'>
      
      <div className='backgroundimage row px-5' >
        {/* <img src="" /> */}
        {/* <img src=''></img> */}

        <p className='col-5 display-1 px-5 mx-5 picfont h-100 py-5 my-5' >A SOFA,
        A GOOD BOOK,
        AND YOU.</p>
      </div>
        <p className='colorDarkBlue display-1'>Welcome! {username}</p>
    </div>
  )
}
