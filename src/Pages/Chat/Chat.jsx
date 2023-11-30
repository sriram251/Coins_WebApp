import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';
import'../../assets/css/main.css'
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [CanSend,setCanSend] = useState(false);
  const chatContainerRef = useRef(null);
  const [documents,setdocuments] = useState([]);

  function GetDocuments(){
    var document =[ {
      "description": "test",
      "document_id": 39,
      "is_encoded": true,
      "title": "Financials",
      "upload_date": "2023-11-13T07:29:23.364583",
      "user_id": 2
  },
  {
    "description": "test2",
    "document_id": 39,
    "is_encoded": true,
    "title": "Financials documents",
    "upload_date": "2023-11-13T07:29:23.364583",
    "user_id": 2
}
  ] 

  setdocuments(document);
  }

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    const selectHeader = document.querySelector('#header');
    selectHeader.classList.add('sticked')
    GetDocuments();
    return () => {
      selectHeader.classList.remove('sticked');
    }
  }, [messages]);

  async function SendMessage(message){
    try{
        var Response = await axios.post("http://127.0.0.1:5000/stream",{Question:message});
        console.log(Response.data);
        const eventSource = new EventSource("http://127.0.0.1:5000/stream");
        eventSource.onmessage= (event)=>{
          console.log(event.data)
        }
       
        eventSource.onopen =(event)=>{
          console.log("connecting.......")
        }
        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
          eventSource.close();
        };
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
  
        setInputMessage('');
  
        // Simulate ChatGPT response (you can replace this with actual API calls)
        setTimeout(() => {
          const chatGPTMessage = {
            text: 'This is a sample response from ChatGPT.',
            sender: 'chatgpt',
          };
  
          // Update the state correctly to append the ChatGPT message
          setMessages((prevMessages) => [...prevMessages, chatGPTMessage]);
        });
      }
  };

  


  return (
    <div className='hero d-flex align-items-stretched '>
      <div className='DocumentList'>
        <h2>Documents</h2>
        <ul className='listcontainer'>
        {
            documents.map((data)=>{
              return <li className='listitem'>
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
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn-get-started" onClick={handleSendMessage} disabled={CanSend}>Send</button>
      </div>
    </div>
    </div>
    
  );
};

export default Chat;
