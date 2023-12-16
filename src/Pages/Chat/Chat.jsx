import React, { useState, useEffect, useRef } from 'react';
import {useSelector,useDispatch} from "react-redux"
import {GetDocuments,DocumentQA} from '../../Services/Apiservice'
import {logout} from '../../Redux/Reducers/authslice'
import './Chat.css';
import'../../assets/css/main.css'
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [CanSend,setCanSend] = useState(true);
  const [SelectedDocument,setSelectedDocument] = useState(0);
  
  const chatContainerRef = useRef(null);
  const [documents,setdocuments] = useState([]);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    const selectHeader = document.querySelector('#header');
    selectHeader.classList.add('sticked')
   
    return () => {
      selectHeader.classList.remove('sticked');
    }
  }, [messages]);
  useEffect(() => {
    
    GetDocument();
    
  }, []);

  async function SendMessage(message){
    try{
      var data = {
        "Document_id":SelectedDocument,
    "Question": message
    }
    DocumentQA(UserDetail.token,data).then((data)=>{
        
        const ChatGPtResponse = {
            text: data.Response.text,
            sender: 'chatgpt',
          };
        setMessages((prevMessages) => [...prevMessages,ChatGPtResponse ]);
        setCanSend(true)
    }).catch((err)=>{
        console.log(err);
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
        
        // Update the state correctly to append the new user message
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setCanSend(false)
        SendMessage(inputMessage)
        setInputMessage('');
  
        // Simulate ChatGPT response (you can replace this with actual API calls)
       
      }
  };

  const selectDoc = (e)=>{
    setSelectedDocument(e);
  }
  
  function GetDocument(){
    GetDocuments(UserDetail.token).then((data)=>{
        console.log(data.Response);
        setdocuments(data.Response);
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

  return (
    <div className='hero d-flex align-items-stretched '>
      <div className='DocumentList'>
        <h2>Documents</h2>
        <ul className='listcontainer'>
        {
            documents.map((data)=>{
              return <li className={`listitem ${data.document_id === SelectedDocument ?"SelectedDocument":""}`} key={data.document_id} onClick={(e)=>selectDoc(data.document_id)}>
                {data.title}
              </li>
            })
          }
        </ul>
         
      </div>
      <div className="chat-ui ">
      <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
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

export default Chat;
