import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { Modal, Button, Form } from "react-bootstrap";
import {register} from '../../Services/Apiservice'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import './Register.css'

const RegisterModal = ({ onClose,isopen,openLogin }) => {
  const [username,setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateinput()){

        let Registerdata = {
          "username":username,
          "email":email,
          "password":password ,
          "Isadmin": true
          }
         
          register(Registerdata).then((data)=>{
            dispatch(showAlert({"message":"User registerd succesfully",
            "alertType":"Success"}))
            setTimeout(() => {
              // Hide the alert after the timeout
              dispatch(
                hideAlert()
              );
            }, 2000);
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
          }, 4000);
            console.log(error);
        })
    } 
    // TODO: Handle login here
  };

  function validateinput(){
    let isvalid = true;
    if(username.trim() === ""){
      isvalid = false
  }
    if(email.trim() === ""){
        isvalid = false
    }
    if(password.trim() === ""){
        isvalid = false
    }
    if(!isvalid){
      dispatch(
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
      }, 2000);
    }
    
    return isvalid
  }

  return (
    <Modal show={isopen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Enter UserName"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            
          </Form.Group>
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
        <div className="Nav-login">
            <a onClick={openLogin}>login?</a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
                Register
          </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;