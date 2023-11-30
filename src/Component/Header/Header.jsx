import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import "../../assets/css/main.css"
import ExitToAppIcon from '@mui/icons-material/ExitToAppRounded';
import PersonIcon from '@mui/icons-material/Person2Rounded'
import { Link } from 'react-router-dom';
import {logout} from '../../Redux/Reducers/authslice'
import './Header.css'
function Header({ onOpen}) {
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const OpenLogin = (e)=>{
    e.preventDefault(); 
    console.log("login")
    onOpen();
  } 
  const Logout = ()=>{
    dispatch(logout())
  }
  console.log(UserDetail)
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <Link  to="/" className="logo d-flex align-items-center">
       
        
        <h1 className="d-flex align-items-center">Nova</h1>
      </Link>

      <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

      <nav id="navbar" className="navbar">
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          


          {UserDetail.isAuthenticated ? 
          <>
          <li><Link to="/Dashboard">Dashboard</Link></li>
          <li><Link to="/InsuranceAssistant">InsuranceAssistant</Link></li>
          <li className="dropdown"><Link><span>Finance</span> <i className="bi bi-chevron-down dropdown-indicator"></i></Link>
            <ul>
              <li><Link to="/DocumentQ&A">DocumentQ&A</Link></li>
              <li><Link to="/Documents">Documents</Link></li>
              <li><Link to="/financialAssistant">financialAssistant</Link></li>
              <li><Link to="/Expenses">Expenses</Link></li>
              <li><Link to="/Budget">Budget</Link></li>
              <li><Link to="/ExpenseCategory">ExpenseCategory</Link></li>
            </ul>
          </li>
          
          <li>
            <div className='LoggedinContainer'>
                    <PersonIcon />

                   
                    <ExitToAppIcon onClick={Logout}/>
                  </div>
          </li>
          </> : 
          <li><Link className="btn-get-started"  onClick={OpenLogin}>Login</Link></li>
          }
        </ul>
      </nav>

    </div>
  </header>
  )
}

export default Header