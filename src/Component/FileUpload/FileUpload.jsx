import React,{useState} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import "./FileUpload.css"
function FileUpload({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    title: "",
    description: "",
    selectedFile: undefined,
  });
  const [UploadMessage,SetUploadMessage]   = useState("");

  function handleChange(e){
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    console.log(FormData);
  }
  function handleClose(){
    setFormData({title: "",
    description: "",
    selectedFile: undefined,})
    onclose()
  }

  return (
    
    <div id="my-modal" className={` modal  justify-content-center ${isopen?"show fade":""}`}tabindex="-1" role="dialog" aria-hidden="true" style={{"display":isopen?"flex":"none","backgroundColor":"#000000b0"}}>
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
                            <Form.Control type="file" size="sm" name='selectedFile' value={FormData.selectedFile} onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Upload</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default FileUpload