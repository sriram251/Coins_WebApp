import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
function FileUpload() {
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
  return (
    <div>
        <Form>
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
    </div>
  )
}

export default FileUpload