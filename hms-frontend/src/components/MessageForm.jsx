import { useState } from "react";

const MessageForm = () => {
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [message, setMessage]=useState("");
  
  const handleMessageSubmit=async (e)=>{
    e.preventDefault();
  }

  return (
    <div className="container form-component message-form">
        <h2>Send us a message</h2>
        <form onSubmit={handleMessageSubmit}>
            <div>
                <input type="text" placeholder="Enter first name..." value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                <input type="text" placeholder="Enter second name..." value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Enter email..." value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="text" placeholder="Enter phone number..." value={phone} onChange={(e)=> setPhone(e.target.value)}/>
            </div>
            <textarea rows={7} placeholder="Enter message..." value={message} onChange={(e)=> setMessage(e.target.value)}></textarea>
            <div style={{justifyContent: "center", alignItems: "center"}}>
                <button type="submit">Send</button>
            </div>
        </form>
    </div>
  )
}

export default MessageForm;