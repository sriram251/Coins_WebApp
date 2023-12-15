import React,{useState} from 'react'
import {Form } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {logout} from '../../Redux/Reducers/authslice'
import {addDocument} from '../../Services/Apiservice'

import "./FileUpload.css"
function FileUpload({isopen,onclose}) {
  const [Uploadfile,setFormData]   = useState({
    title: "",
    description: "",
    selectedFile: undefined,
  });
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleChange(e){
    const { name, type, files } = e.target;

    // Check if the input type is 'file'
    if (type === 'file') {
      // Update the state with the selected file
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // For non-file inputs, update the state with the input value
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }

    console.log(FormData);
  }
  function handleClose(){ 
    onclose()
  }

  function Uploadocument(){
    let data = new FormData();
    data.append('description', Uploadfile.description);
    data.append('file', Uploadfile.selectedFile);
    data.append('Title', Uploadfile.title);
    
    addDocument(UserDetail.token,data).then((response)=>{
      console.log(response);
      dispatch(
        showAlert({
          "message":response.data,
          "alertType":"success"
        })
      )
      setTimeout(() => {
        // Hide the alert after the timeout
        dispatch(
          hideAlert()
        );
      }, 2000);
      
      console.log(data);
    }).catch((err)=>{
      if (err.response && err.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
      dispatch(
        showAlert({
          "message":"something went wrong please try again",
          "alertType":"warning"
        })
      )
      console.log(err);
    })
  }
  return (
    
    <div id="my-modal" className={` modal  justify-content-center ${isopen?"show fade":""}`} tabIndex="-1" role="dialog" aria-hidden="true" style={{"display":isopen?"flex":"none","backgroundColor":"#000000b0"}}>
            <div className="modal0-dialog  modal-dialog-centered justify-content-center modalContainer" role="document">
                <div className="modal-content  border-0 mx-3">   
                    <div className="modal-body  p-0">
                    <div className='modal-header'>
                      <h2 className='HeaderText'>Add Document</h2>
                      <button className='CloseButton'onClick={handleClose}>&#128473;</button>
                    </div>
                    <Form  className="modal-body">
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="Text" name='title' placeholder="Title" onChange={handleChange} value={FormData.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onChange={handleChange}  value={FormData.description} />
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Document</Form.Label>
                            <Form.Control type="file" size="sm" name='selectedFile' onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={Uploadocument}>Upload</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default FileUpload