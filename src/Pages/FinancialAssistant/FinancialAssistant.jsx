import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from "react-redux"
import './FinancialAssistant.css'
import { financailAssistant } from '../../Services/Apiservice';
import {logout} from '../../Redux/Reducers/authslice'
const FinancialAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [CanSend,setCanSend] = useState(false);
    const chatContainerRef = useRef(null);
    const dispatch = useDispatch();
    const UserDetail = useSelector((state) => state.auth);
    useEffect(() => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      const selectHeader = document.querySelector('#header');
      selectHeader.classList.add('sticked')
      
      return () => {
        selectHeader.classList.remove('sticked');
      }
    }, [messages]);
  
    async function SendMessage(message){
      try{
        var data = {
            "Question":message
        }
        financailAssistant(UserDetail.token,data).then((data)=>{
            console.log(data.Response)
            const ChatGPtResponse = {
                text: data.Response,
                sender: 'chatgpt',
              };
            setMessages((prevMessages) => [...prevMessages,ChatGPtResponse ]);
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
          //SendMessage(inputMessage)
          SendMessage(inputMessage)
          setInputMessage('');
    
        }
    };
  
    
  
  
    return (
      <div className='hero d-flex align-items-stretched '>
        
      <div className="chat-ui ">
      <h2 className='Assistantheader'>Financial Assistant</h2>
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
}

export default FinancialAssistant