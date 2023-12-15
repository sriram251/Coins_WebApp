import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import "./Insurance_Schemes.css"
import '../../assets/css/main.css'
import {GetInsuranceSchemes} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
import InsuranceCard from '../../Component/Insurance_Card/Insurance_Card';
import AddInsuranceScheme from '../../Component/AddInsuranceScheme/AddInsuranceScheme';
const InsuranceSchemes = () => {
  const [InsuranceSchemes, setInsuranceSchemes] = useState([]);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch documents or set them from your state management library
     
    Get_InsuranceSchemes()

   
  }, []);
  function Get_InsuranceSchemes(){
    console.log(UserDetail)
    GetInsuranceSchemes(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setInsuranceSchemes(data.Response);
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
 

  const [isUploadpopupOpen, setUploadpopupOpen] = useState(false);

  const openUploadpopup = () => {
    setUploadpopupOpen(true);
    console.log(isUploadpopupOpen)
  };
  const closeUploadpopup = () => {
    
    setUploadpopupOpen(false); 
    Get_InsuranceSchemes()
   
  };

  return (
    <div>
    
    <div className="breadcrumbs d-flex align-items-center DocumentBGImg" >
            <div className="container position-relative d-flex flex-column align-items-center">

                <h2>Insurance Schemes</h2>
                <ol>
                <li><a href="index.html">Home</a></li>
                <li>Insurance Schemes</li>
                </ol>

            </div>
    </div>
    {
        isUploadpopupOpen?
        <AddInsuranceScheme isopen={isUploadpopupOpen} onclose={closeUploadpopup}/>:<></>

    } 
    
    <section id="blog" className="blog">
      <div className="container "  data-aos="fade-up">
        <div className='DocumentMangerHeader'>
            <h2 className='DocumentManagerHeaderText'>Insurance Schemes</h2>
            <button className="AddDocumentButton" onClick={openUploadpopup}>Add Insurance Scheme</button>
        </div>
        <div className="blog-list-container">
                {InsuranceSchemes.map((scheme) => (
                    <InsuranceCard scheme={scheme}/>
                ))}
        </div>
   

      </div>
    </section>
    
    </div>
   
  );
};

export default InsuranceSchemes;