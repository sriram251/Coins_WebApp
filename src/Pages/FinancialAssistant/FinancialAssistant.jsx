import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import './FinancialAssistant.css'
const FinancialAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [CanSend,setCanSend] = useState(false);
    const chatContainerRef = useRef(null);
    
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