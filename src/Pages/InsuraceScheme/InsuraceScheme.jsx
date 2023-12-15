import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import './InsuraceScheme.css'
import {GetInsuranceSchemesByID} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
import {ChatBubbleOutline}from "@mui/icons-material"
import {FileDownload } from '@mui/icons-material';
import InsuranceChat from '../../Component/InsuranceChat/InsuranceChat';
import {AppService,Endpoints} from "../../config"
function InsuraceScheme() {
  const [InsuranceSchemes, setInsuranceSchemes] = useState({scheme_name:"",description:"",category:{category_name:""}});
  const [isLoading,setIsLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };



  const renderDescription = () => {
    if (showFullDescription) {
      return InsuranceSchemes.description;
    } else {
      // Show only a portion of the description
      return `${InsuranceSchemes.description.substring(0, 500)}...`;
    }
  };
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { SchemeId } = useParams();
  const [isUploadpopupOpen, setUploadpopupOpen] = useState(false);


  function DownloadScheme(){
    let url = AppService + Endpoints.downloadScheme + InsuranceSchemes.scheme_id
    window.open(url, '_blank');
  }   
  function Get_InsuranceSchemes(Id){
    setIsLoading(true)
    GetInsuranceSchemesByID(UserDetail.token,Id).then((data)=>{
        console.log(data);
        setInsuranceSchemes(data);
        setIsLoading(false)
        
     }).catch((err)=>{
        if (err.response && err.response.status === 401) {
            // Trigger the logout action when a 401 error occurs
            dispatch(logout());
            console.log("ok")
           
            window.location.href = "/";
          }
        console.log(err)
        setIsLoading(false)
     })
  }
  const openChatpopup = () => {
    setUploadpopupOpen(true);
    
  };
  const closeChatpopup = () => {
    
    setUploadpopupOpen(false); 
   
  };
  useEffect(() => {
        Get_InsuranceSchemes(SchemeId)
        const selectHeader = document.querySelector('#header');
        selectHeader.classList.add('InsuranceSticked')
        
        return () => {
             
          selectHeader.classList.remove('InsuranceSticked');
        }
  }, [SchemeId]);
  console.log(InsuranceSchemes.category);
  return (
    <section id="blog" className="blog">
      {
        isUploadpopupOpen?
        <InsuranceChat isopen={isUploadpopupOpen} onclose={closeChatpopup} SchemeId={InsuranceSchemes.scheme_id}/>:<></>

    } 
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {
            isLoading 
            ?
            <span class="loader loading-blue"></span>:

            <div className="row InsuranceSchemeContainer" >

                <div className="col-lg-8 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">

                <article className="blog-details">

                    
                <div>
                <button className="ReadMoreButton" onClick={toggleDescription}>
                &#8592; back
             </button>
                </div>
                <div className="InsuranceschemsHeader">

                    <h2>{InsuranceSchemes.scheme_name}</h2>
                    <div className='IconContainer'>
                        <button className='SchemeActive' onClick={openChatpopup} disabled={!InsuranceSchemes.isencoded}><ChatBubbleOutline  /></button>
                        <button className='SchemeActive' onClick={DownloadScheme}><FileDownload /> </button>
                    </div>
                    
                </div>
                <p className='InsuranceCategory'>
                    <strong>Category:</strong>
                    <span className="category-tag">{InsuranceSchemes.category.category_name}</span>
                </p>
                <div className='InsurancetwoColumn'>
                    <p>
                        <strong>Coverage Amount:</strong> {InsuranceSchemes.coverage_amount}
                    </p>
                    <p>
                        <strong>Premium Amount:</strong> {InsuranceSchemes.premium_amount}
                    </p>
                </div>
                <div className='InsurancetwoColumn'>
                    <p>
                        <strong>Start Date:</strong> {InsuranceSchemes.start_date}
                    </p>
                    <p>
                        <strong>End Date:</strong> {InsuranceSchemes.end_date}
                    </p>
                </div>
                
                <p className='InsuranceDescription'>
                <strong>Description:</strong> {renderDescription()}
                {!showFullDescription ?
                <button className="ReadMoreButton" onClick={toggleDescription}>
                    Read More
                </button>
                :
                <button className="ReadMoreButton" onClick={toggleDescription}>
                Read less
             </button>}
                </p>
                    
                    </article>
                </div>


                </div>
        }
                    
        

      </div>
    </section>
  )
}

export default InsuraceScheme