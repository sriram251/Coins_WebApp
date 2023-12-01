import React,{useState,useEffect} from 'react'
import { Form } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {logout} from '../../Redux/Reducers/authslice'
import 'react-datepicker/dist/react-datepicker'
import "./AddBudget.css"

import {addBudget,getExpenseCategory} from '../../Services/Apiservice'

function AddBudget({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    category_id: 0,
    budget_amount: 0,
    Date:""
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
    
  }
  function GetExpenceCategory(){
    getExpenseCategory(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setExpenceCategorys(data.Response);
     }).catch((err)=>{
      if (err.response && err.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
        console.log(err)
     })
  }
  
  function handleClose(){
    setFormData({title: "",
    description: "",
    selectedFile: undefined,})
    onclose()
  }

  function AddBudget(){
    console.log(FormData)
    const month = FormData.Date.split("-")[1]; // Months are zero-based, so add 1
    const year = FormData.Date.split("-")[0];

    let finalData = { "category_id": FormData.category_id,
    "budget_amount": FormData.budget_amount,
    "month": month,
    "year": year}
    addBudget(finalData,UserDetail.token).then((response)=>{

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
                      <h2 className='HeaderText'>Add Budget</h2>
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
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="number" name='budget_amount' placeholder="Budget" onChange={handleChange} value={FormData.budget_amount}/>
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Budget Period</Form.Label>
                            <Form.Control type="month" name='Date' placeholder="Date" onChange={handleChange} value={FormData.Date }/>
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={AddBudget}>Upload</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default AddBudget