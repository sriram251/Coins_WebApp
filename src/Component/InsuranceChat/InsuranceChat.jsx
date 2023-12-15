import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker";
import "./InsuranceChat.css";

import { ChatWithScheme } from "../../Services/Apiservice";

function InsuranceChat({ isopen, onclose,SchemeId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [CanSend, setCanSend] = useState(true);

  const chatContainerRef = useRef(null);
  const UserDetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [messages]);

  function handleClose() {
    
    onclose();
  }

  async function SendMessage(message){
    try{
      var data = {
          "SchemeId":SchemeId,
          "Question":message
      }
      ChatWithScheme(UserDetail.token,data).then((data)=>{
          console.log(data.Response)
          const ChatGPtResponse = {
              text: data.Response.text,
              sender: 'chatgpt',
            };
          setCanSend(true)
          setMessages((prevMessages) => [...prevMessages,ChatGPtResponse ]);
         
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
        setCanSend(false)
        
        // Update the state correctly to append the new user message
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        //SendMessage(inputMessage)
        SendMessage(inputMessage)
        setInputMessage('');
  
      }
  };

  return (
    <div
      id="my-modal"
      className={` modal  justify-content-center ${isopen ? "show fade" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      style={{
        display: isopen ? "flex" : "none",
        backgroundColor: "#000000b0",
      }}
    >
      <div
        className="modal0-dialog  modal-dialog-centered justify-content-center modalContainer"
        role="document"
      >
        <div className="modal-content  border-0 mx-3">
          <div className="modal-body  p-0">
           
            <div className="chat-ui ">
            <div className="modal-header">
              <h2 className="HeaderText">Scheme</h2>
              <button className="CloseButton " onClick={handleClose}>
                &#128473;
              </button>
            </div>
              <div className="chat-container" ref={chatContainerRef}>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    {message.text}
                  </div>
                ))}
                {!CanSend ? <span class="loader"></span> : <></>}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                {!CanSend ? (
                  <div className="LoadingButtion">
                    <span class="loader"></span>
                  </div>
                ) : (
                  <button
                    className="btn-get-started"
                    onClick={handleSendMessage}
                    disabled={!CanSend}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceChat;
