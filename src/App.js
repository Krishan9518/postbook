import './App.css';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './components/404';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import UserDetails from './components/UserDetails';
import jwtDecode from "jwt-decode";
import React from 'react';
import { connect } from 'react-redux';
import logoutAction from './components/actions/logoutAction';


function App(props) {

  const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"))
  const { logoutAction } = props
  const navigate = useNavigate()

  React.useEffect(() => {
    if (USER!==null) {
      let { token } = USER

      let expiryTime = jwtDecode(token).exp;
      // logout after 24 hrs
      if (expiryTime < (Date.now() / 1000)) {
        logoutAction()
        navigate("/login", { state: { msgFromApp: "Session Expired please login again." } })
      }
    }
  }, [USER, logoutAction ,navigate])


  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<UserDetails />} />
          <Route path='/page' element={<Pagination />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logoutAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
