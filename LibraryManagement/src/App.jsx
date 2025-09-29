import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AddBook } from './Components/AddBook';
import { BookList } from './Components/BookList';
import { EditBook } from './Components/EditBook';
import { Login } from './Components/Login';
import { ShowBook } from './Components/ShowBook';
import { SignUp } from './Components/SignUp';
import { UserList } from './Components/UserList';
import useFetch from './Hooks/useFetch'
import { LoginProvider } from './Context/LoginContext';
import { Home } from './Components/Home';
import { ProtectedRoute } from './ProtectedComponent/ProtectedRoute';
import { Navbar } from './Components/Navbar';
import { Borrowed } from './Components/Borrowed';
import { ProfileUser } from './Components/ProfileUser';
import { ShowUser } from './Components/ShowUser';
import { NoFoundPage } from './Components/NoFoundPage';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { ShowPDF } from './Components/ShowPDF';


function App() {

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  // let {data,loading,error}=useFetch("http://localhost:8181/api/users/xyz");


  // console.log("Data\n\n",data);
  

  return (
    <div className=''>
      {/* <p className='display-1'>Hellpo</p> */}
      {/* <div className='container d-flex flex-column justify-content-center align-items-center border gap-3 mt-5 p-5 w-50 shadow'> */}
        {/* <Login></Login> */}
        {/* <SignUp></SignUp> */}
        {/* <BookList></BookList> */}

        {/* <UserList></UserList>
         */}

          {/* <EditBook></EditBook> */}
          {/* <ShowBook></ShowBook> */}

         {/* <AddBook></AddBook> */}
      {/* </div> */}

      <BrowserRouter>
          <LoginProvider>

          <Navbar></Navbar>

            <Routes>
              <Route path='/' element={<Login></Login>}></Route>
              <Route path='/signup' element={<SignUp></SignUp>}></Route>


              <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home></Home>}></Route>
              <Route path='/books' element={<BookList></BookList>}></Route>
              <Route path='/borrowed' element={<Borrowed></Borrowed>}></Route>
              <Route path='/showpdf/:id' element={<ShowPDF></ShowPDF>}></Route>
              <Route path='/addbook' element={<AddBook></AddBook>}></Route>
              <Route path='/book/:id' element={<ShowBook></ShowBook>}></Route>
              <Route path='/edit/:id' element={<EditBook></EditBook>}></Route>

              <Route path='/userlist' element={<UserList></UserList>}></Route>
              <Route path='/userlist/user/:id' element={<ShowUser></ShowUser>}></Route>
              <Route path='/profile' element={<ProfileUser></ProfileUser>}></Route>
              {/* <Route path='*' element={<NoFoundPage></NoFoundPage>}></Route> */}
              
              </Route>
            </Routes>
          </LoginProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
