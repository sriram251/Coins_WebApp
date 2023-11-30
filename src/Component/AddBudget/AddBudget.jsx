import React,{useState} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker'
import "./AddBudget.css"
function AddBudget({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    category_id: 0,
    budget_amount: 0,
    Date:""
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
                      <h2 className='HeaderText'>Add Budget</h2>
                      <button className='CloseButton'onClick={handleClose}>&#128473;</button>
                    </div>
                    <Form  className="modal-body">
                    <Form.Group className="mb-3" >
                            <Form.Label>category</Form.Label>
                            <Form.Control type="number" name='category_id' placeholder="category" onChange={handleChange} value={FormData.category_id}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="number" name='budget_amount' placeholder="Budget" onChange={handleChange} value={FormData.budget_amount}/>
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Budget Period</Form.Label>
                            <Form.Control type="date" name='Date' placeholder="Date" onChange={handleChange} value={FormData.Date }/>
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

export default AddBudget