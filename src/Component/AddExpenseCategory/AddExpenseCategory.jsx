import React,{useState} from 'react'
import {  Form } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {logout} from '../../Redux/Reducers/authslice'
import {addExpenseCategory} from '../../Services/Apiservice'
import "./AddExpenseCategory.css"
function AddExpenseCategory({isopen,onclose}) {
  const [FormData,setFormData]   = useState({
    category_name: "",
  });
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
  function handleClose(){
    setFormData({title: "",
    description: "",
    selectedFile: undefined,})
    onclose()
  }
  function InsertExpenseCategory(){
    
        addExpenseCategory(FormData,UserDetail.token).then((response)=>{
          console.log(response)
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
          handleClose()
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
    
    <div id="my-modal" className={` modal  justify-content-center ${isopen?"show fade":""}`}tabindex="-1" role="dialog" aria-hidden="true" style={{"display":isopen?"flex":"none","backgroundColor":"#000000b0"}}>
            <div className="modal0-dialog  modal-dialog-centered justify-content-center modalContainer" role="document">
                <div className="modal-content  border-0 mx-3">   
                    <div className="modal-body  p-0">
                    <div className='modal-header'>
                      <h2 className='HeaderText'>Add Expense Category</h2>
                      <button className='CloseButton'onClick={handleClose}>&#128473;</button>
                    </div>
                    <Form  className="modal-body">
                        <Form.Group className="mb-3" >
                            <Form.Label>category Name</Form.Label>
                            <Form.Control type="Text" name='category_name' placeholder="Title" onChange={handleChange} value={FormData.category_name}/>
                        </Form.Group>
                    </Form>
                    <div className='ModalFooter'>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={InsertExpenseCategory}>Upload</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default AddExpenseCategory