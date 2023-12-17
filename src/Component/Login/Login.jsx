import React, { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap";
import {login} from '../../Services/Apiservice'
import {loginSuccess} from '../../Redux/Reducers/authslice'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import './Login.css'
const LoginModal = ({ onClose,isopen,OpenRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateinput()){

        let logindata = {
            "email": email,
            "password": password
          }
          console.log(logindata);
          login(logindata).then((data)=>{
            dispatch(loginSuccess(data))
            console.log(data);
            onClose()
        }).catch((error)=>{
          dispatch(
            showAlert({
              "message":"SomeThing went wrong",
              "alertType":"warning"
            })
          )
          setTimeout(() => {
            // Hide the alert after the timeout
            dispatch(
              hideAlert()
            );
          }, 2000);
            console.log(error);
        })
    } 
    // TODO: Handle login here
  };

  function validateinput(){
    let isvalid = true;
    if(email.trim() === ""){
        isvalid = false
    }
    if(password.trim() === ""){
        isvalid = false
    }
    if(!isvalid)
    { dispatch(
      showAlert({
        "message":"Please Enter Valid Credential",
        "alertType":"warning"
      })
    )
    setTimeout(() => {
      // Hide the alert after the timeout
      dispatch(
        hideAlert()
      );
    }, 2000);}
    return isvalid
  }

  return (
    <Modal show={isopen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          
        </Form>
        <div className="Nav-Register">
          <a onClick={OpenRegister}>Register?</a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
          </Button>
        <Button className="secondary" variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;