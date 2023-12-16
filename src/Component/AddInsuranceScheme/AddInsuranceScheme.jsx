import React,{useState,useEffect} from 'react'
import {Form } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux'
import {showAlert,hideAlert} from '../../Redux/Reducers/alertslice'
import {logout} from '../../Redux/Reducers/authslice'
import {add_insurance_scheme,Get_Insurance_Summary,Get_InsuranceCategory} from '../../Services/Apiservice'

import "./AddInsuranceScheme.css"
function AddInsuranceScheme({isopen,onclose}) {
  const [formData,setformData]   = useState({
    scheme_name: "",
    description: "",
    coverage_amount: 0,
    premium_amount: 0,
    start_date: "",
    end_date: "",
    category_id: 0,
    selectedFile: undefined,
  });

  const [isLoading,setIsLoading] = useState(false)


  const [InsuranceCategorys, setInsuranceCategorys] = useState([]);
  useEffect(()=>{
    GetInsuranceCategory()
  },[])
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleChange(e){
    const { name, type, files } = e.target;

    // Check if the input type is 'file'
    if (type === 'file' && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.type === 'application/pdf') {

        // Check if the file size is less than 1MB
        if (selectedFile.size <= 1024 * 1024) {
          // File is valid, update the state
          setformData((prevData) => ({
            ...prevData,
            selectedFile: selectedFile,
          }));
        } else {
          // File size exceeds 1MB, show an error message or take appropriate action
          alert('File size must be less than 1MB');
          e.target.value = null;
          setformData((prevData) => ({
            ...prevData,
            selectedFile: null,
          }));
        }
      } else {
        // File is not a PDF, show an error message or take appropriate action
        alert('Please select a PDF file');
        e.target.value = null;
        setformData((prevData) => ({
          ...prevData,
          selectedFile: null,
        }));
      }
      // Update the state with the selected file
     
    } else {
      // For non-file inputs, update the state with the input value
      setformData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }

    console.log(formData);
  }
  function handleClose(){ 
    onclose()
  }
  function GetSummary(){
    console.log("Getting summary")
    setIsLoading(true)
    let data = new FormData();
    data.append('file', formData.selectedFile);
    Get_Insurance_Summary(UserDetail.token,data).then((response)=>{
      setformData({...formData,description:response.output_text})
      dispatch(
        showAlert({
          "message":"Got document Summary",
          "alertType":"success"
        })
      )
      setIsLoading(false)
      
      console.log(data);
    }).catch((err)=>{
      if (err.response && err.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
      dispatch(
        hideAlert()
      )
      setIsLoading(false)
      console.log(err);
    })
  }
  function GetInsuranceCategory(){
    Get_InsuranceCategory(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setInsuranceCategorys(data.Response);
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
  function Uploadocument(){
    let data = new FormData();
    data.append('scheme_name', formData.scheme_name);
    data.append('description', formData.description);
    data.append('coverage_amount', formData.coverage_amount);
    data.append('premium_amount', formData.premium_amount);
    data.append('start_date', formData.start_date);
    data.append('end_date', formData.end_date);
    data.append('category_id', formData.category_id);
    data.append('file', formData.selectedFile);
    
    add_insurance_scheme(UserDetail.token,data).then((response)=>{
      dispatch(
        showAlert({
          "message":response.data,
          "alertType":"success"
        })
      )
      
      console.log(data);
      onclose()
    }).catch((err)=>{
      if (err.response && err.response.status === 401) {
        // Trigger the logout action when a 401 error occurs
        dispatch(logout());
        console.log("ok")
        window.location.href = "/";
      }
      dispatch(
        hideAlert()
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
                      <h2 className='HeaderText'>Add Insurance Scheme</h2>
                      <button className='CloseButton'onClick={handleClose} disabled={isLoading} >&#128473;</button>
                    </div>
                    {
                    isLoading ? 
                    <div className='LoadingContainer'>
                          <span>Please wait.. It may take a while to process </span>
                          <span class="loader"></span>
                    </div>
                  
                      :
                    <></> 
                  }
                    <Form  className="modal-body AddInsuranceBody">
                    <Form.Group className="mb-3">
        <Form.Label>Scheme Name</Form.Label>
        <Form.Control
          type="Text"
          name='scheme_name'
          placeholder="Title"
          onChange={handleChange}
          value={formData.scheme_name}
        />
      </Form.Group>
      <div className='GetSummaryContainer'>
      <Form.Group controlId="formFileSm" className="mb-3">
      <Form.Label>Scheme Doument</Form.Label>
      <Form.Control type="file" size="sm" name='selectedFile' accept=".pdf" onChange={handleChange}/>
      
       </Form.Group>
      {formData.selectedFile ? 
        <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase GetDescription' onClick={GetSummary} type='button'>Get Description</button>
        :
        <></>
      }
      
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name='description'
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
      </Form.Group>
      
      <div className='two-column'>
      <Form.Group className="mb-3">
        <Form.Label>Coverage Amount</Form.Label>
        <Form.Control
          type="number"
          name='coverage_amount'
          placeholder="Coverage Amount"
          onChange={handleChange}
          value={formData.coverage_amount}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Premium Amount</Form.Label>
        <Form.Control
          type="number"
          name='premium_amount'
          placeholder="Premium Amount"
          onChange={handleChange}
          value={formData.premium_amount}
        />
      </Form.Group>
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select name="category_id" onChange={handleChange} value={FormData.category_id}>
                            <option value="" disabled>Select a category</option>
                            {InsuranceCategorys.map((category) => (
                              <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                              </option>
                            ))}
        </Form.Select>  
      </Form.Group>
      <div className='two-column'>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name='start_date'
            onChange={handleChange}
            value={formData.start_date}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name='end_date'
            onChange={handleChange}
            value={formData.end_date}
          />
        </Form.Group>
      </div>
      
      
     
                     </Form>
                    <div className='ModalFooter'>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={Uploadocument} disabled={isLoading}>Upload</button>
                      <button className='btn btn-primary btn-block  text-dark font-weight-bold text-uppercase' onClick={handleClose} disabled={isLoading}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default AddInsuranceScheme