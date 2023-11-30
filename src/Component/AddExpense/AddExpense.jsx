import React,{useState} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import "./AddExpense.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function AddExpense({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    category_id: 0,
    amount: 0,
    description: "",
    expense_date: ""
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
                      <h2 className='HeaderText'>Add Expense</h2>
                      <button className='CloseButton'onClick={handleClose}>&#128473;</button>
                    </div>
                    <Form  className="modal-body">
                        <Form.Group className="mb-3" >
                            <Form.Label>category</Form.Label>
                            <Form.Control type="number" name='category_id' placeholder="category" onChange={handleChange} value={FormData.category_id}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Expenese</Form.Label>
                            <Form.Control type="number" name='amount' placeholder="Expenese" onChange={handleChange} value={FormData.amount}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onChange={handleChange}  value={FormData.description} />
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Expense Date</Form.Label>
                            <DatePicker
                              selected={FormData.Date}
                              onChange={handleChange}
                              name='Date'
                              dateFormat="dd/MM/yyyy"  // Adjust the date format as needed
                              // Other DatePicker props as needed
                            />
                            
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

export default AddExpense