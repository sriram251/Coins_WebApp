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
  const url = window.location.pathname;
  console.log(url)
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <Link  to="/" className="logo d-flex align-items-center">
       
        
        <h1 className="d-flex align-items-center">Coins</h1>
      </Link>

      <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

      <nav id="navbar" className="navbar">
        <ul>
          <li><Link to="/" className={`${url==='/'?"active":""}`}>Home</Link></li>
          {UserDetail.isAuthenticated ? 
          <>
          <li><Link to="/Dashboard" className={`${url==='/Dashboard'?"active":""}`}>Dashboard</Link></li>
          <li className="dropdown"><Link><span>Insurance</span> <i className="bi bi-chevron-down dropdown-indicator"></i></Link>
            <ul>
            <li><Link to="/InsuraceSchemes"className={`${url==='/InsuraceSchemes'?"active":""}`}>Insurace Schemes</Link></li>
            <li><Link to="/InsuranceAssistant"className={`${url==='/InsuranceAssistant'?"active":""}`}>Insurance Assistant</Link></li>
            </ul>
          </li>
          <li className="dropdown"><Link><span>Finance</span> <i className="bi bi-chevron-down dropdown-indicator"></i></Link>
            <ul>
              <li><Link to="/IncomeSource">Income Source</Link></li>
              <li><Link to="/Expenses">Expenses</Link></li>
              <li><Link to="/Budget">Budget</Link></li>
              <li><Link to="/ExpenseCategory">ExpenseCategory</Link></li>
              <li><Link to="/financialAssistant">Financial Assistant</Link></li>
            </ul>
          </li>
          
          <li className="dropdown"><Link><span>Document Support</span> <i className="bi bi-chevron-down dropdown-indicator"></i></Link>
            <ul> 
              <li><Link to="/Documents">Documents</Link></li>
              <li><Link to="/DocumentQ&A">Document Inquiry</Link></li>
            </ul>
          </li>
          
          <li>
            <div className='LoggedinContainer'>
                    <PersonIcon />

                    {UserDetail.username}
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