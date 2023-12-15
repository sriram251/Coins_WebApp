import React, { useState, useEffect, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import './InsuranceAssistant.css';
import'../../assets/css/main.css'
import {logout} from '../../Redux/Reducers/authslice'
import {ChatWithInsuranceAssistant, GetInsuranceSchemes} from '../../Services/Apiservice'
import {OpenInBrowserRounded} from "@mui/icons-material"
import { Link } from 'react-router-dom';
const InsuranceAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [CanSend,setCanSend] = useState(true);
  const chatContainerRef = useRef(null);
  const [InsuranceSchemes, setInsuranceSchemes] = useState([]);
  const [selectedSchemes,SetselectedSchemes] = useState([])
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
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

  

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    const selectHeader = document.querySelector('#header');
    selectHeader.classList.add('sticked')
    
    return () => {
      selectHeader.classList.remove('sticked');
    }
  }, [messages]);
  useEffect(() => {
    
    Get_InsuranceSchemes()
    
  }, []);
  useEffect(() => {
    
    GetRelatedSchemes([])
    
  }, [InsuranceSchemes]);

  async function SendMessage(message){
    try{
      var data = {
          "Question":message
      }
      setCanSend(false)
      ChatWithInsuranceAssistant(UserDetail.token,data).then((data)=>{
          console.log(data.Response)
          const ChatGPtResponse = {
              text: data,
              sender: 'chatgpt',
            };
          setCanSend(true)
          setMessages((prevMessages) => [...prevMessages,ChatGPtResponse ]);
          GetRelatedSchemes(data.schemes)
         
      }).catch((err)=>{
          console.log(err);
          setCanSend(true)
      })
    }
    catch(err){
        console.log(err);
    }
    

  }
  const handleSendMessage = () => {
    if (inputMessage) {
        const userMessage = {
          text: inputMessage,
          sender: 'user',
        };
        //SendMessage(inputMessage)
        // Update the state correctly to append the new user message
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        SendMessage(inputMessage)
        setInputMessage('');
  
        // Simulate ChatGPT response (you can replace this with actual API calls)
       
      }
  };
  const GetRelatedSchemes = (selectedSchemes)=>{
    if(selectedSchemes.length === 0){
      SetselectedSchemes(InsuranceSchemes);
      console.log(selectedSchemes);
    }
    else{
      let result = InsuranceSchemes.filter((data)=>{
        return selectedSchemes.includes(data.scheme_id)
      });
      SetselectedSchemes(result)
    }
  }
  


  return (
    <div className='hero d-flex align-items-stretched '>
      <div className='DocumentList'>
        <h2>Schemes</h2>
        <ul className='listcontainer'>
        {
            selectedSchemes.map((data)=>{
              return <li className='listitem'>
                <div className='InsuranceeSchemContainer'>
                  {data.scheme_name}
                 <Link to={"/InsuraceScheme/"+data.scheme_id}>
                  <OpenInBrowserRounded/>
                 </Link>
                </div>
                
              </li>
            })
          }
        </ul>
         
      </div>
      <div className="Insurance-chat-ui ">
      <h2 className='Assistantheader'>Insurance Assistant</h2>
      <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => {
            if( message.sender === 'user'){
              
              return  <div
              key={index}
              className={`message ${message.sender}`}
              onClick={()=>(GetRelatedSchemes([]))}
            >
              {message.text}
            </div>
            }
            return <div
              key={index}
              className={`message ${message.sender}`}
              onClick={()=>(GetRelatedSchemes(message.text.schemes))}
            >
              {message.text.Response.text}
            </div>
          })}
          {
          !CanSend ? 
          <span class="loader"></span>
          :
          <></> }
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          {
          !CanSend ? 
          <div className='LoadingButtion'>
             <span class="loader"></span>
          </div>
         
          :
          <button className="btn-get-started" onClick={handleSendMessage} disabled={!CanSend}>Send</button> }
          
        </div>
    </div>
    </div>
    
  );
};

export default InsuranceAssistant;
