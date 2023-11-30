import React from 'react';
import {Link} from 'react-router-dom';
import "./Sidebar.css";
function SideNavbar() {

  return (
    <div className="sidebar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/UploadFile">Upload File</Link>
      </li>
      <li>
        <Link to="/Chat">Chat</Link>
      </li>
    </ul>
  </div>
  )
}

export default SideNavbar