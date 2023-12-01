import React,{useState,useEffect} from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import "./AddExpense.css"
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {addExpense,getExpenseCategory} from '../../Services/Apiservice'
import 'react-datepicker/dist/react-datepicker.css';
import { logout } from '../../Redux/Reducers/authslice';
function AddExpense({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    category_id: 0,
    amount: 0,
    description: "",
    expense_date: ""
  });
  const [ExpenceCategorys, setExpenceCategorys] = useState([]);

  useEffect(()=>{
    GetExpenceCategory()
  },[])
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleChange(e){
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    console.log(FormData);
  }
  function GetExpenceCategory(){
    getExpenseCategory(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setExpenceCategorys(data.Response);
     }).catch((error)=>{
      if (error.response && error.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
        console.log(error)
     })
  }
  function handleClose(){
    setFormData({title: "",
    description: "",
    selectedFile: undefined,})
    onclose()
  }
  function AddExpense(){
    
    console.log(FormData)
    addExpense(FormData,UserDetail.token).then((response)=>{
      dispatch(
        showAlert({
          "message":response.message,
          "alertType":"Success"
        })
      )
      setTimeout(() => {
        // Hide the alert after the timeout
        dispatch(
          hideAlert()
        );
      }, 2000);

    }).catch((err)=>{
      if (err.response && err.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
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
      console.log(err);
    })
  }
  return (
    
    <div id="my-modal" className={` modal  justify-content-center ${isopen?"show fade":""}`} tabIndex="-1" role="dialog" aria-hidden="true" style={{"display":isopen?"flex":"none","backgroundColor":"#000000b0"}}>
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
                            <Form.Select name="category_id" onChange={handleChange} value={FormData.category_id}>
                            <option value="" disabled>Select a category</option>
                            {ExpenceCategorys.map((category) => (
                              <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                              </option>
                            ))}
                          </Form.Select> 
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
                            <Form.Control type="date" name='expense_date' placeholder="Date" onChange={handleChange} value={FormData.Date }/>
                            
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                    <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={AddExpense}>Upload</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default AddExpense