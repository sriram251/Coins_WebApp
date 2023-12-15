import React,{useState} from 'react'
import {Form } from "react-bootstrap";
import "./Add_Income_sources.css"
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {addIncomeSource} from '../../Services/Apiservice'
import 'react-datepicker/dist/react-datepicker.css';
import { logout } from '../../Redux/Reducers/authslice';
function AddIncomesources({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    source_name : "",
    amount: 0,
    transaction_date: ""
  });

  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleChange(e){
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  }
  
  function handleClose(){
    onclose()
  }
  function AddIncomesource(){
    
    console.log(FormData)
    addIncomeSource(FormData,UserDetail.token).then((response)=>{
      dispatch(
        showAlert({
          "message":response.message,
          "alertType":"success"
        })
      )
      setTimeout(() => {
        // Hide the alert after the timeout
        dispatch(
          hideAlert()
        );
      }, 2000);
      onclose();

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
                      <h2 className='HeaderText'>Add Incomesource</h2>
                      <button className='CloseButton'onClick={handleClose}>&#128473;</button>
                    </div>
                    <Form  className="modal-body">
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Source</Form.Label>
                            <Form.Control type='Text' name='source_name' placeholder="Source" onChange={handleChange}  value={FormData.source_name} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name='amount' placeholder="Income" onChange={handleChange} value={FormData.amount}/>
                        </Form.Group>
                       
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control type="date" name='transaction_date' placeholder="Date" onChange={handleChange}/>
                            
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                    <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={AddIncomesource}>Add</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default AddIncomesources