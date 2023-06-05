import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import EmailLogo from '../images/EmailLogo.png'
import Header from '../components/Header';
function Index() {
  const form = useRef();
  const [emailSent,setEmailSent]=useState(false)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [content,setContent]=useState("")
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_9s2qswo', 'template_blbex3r', form.current, 'U4q00Baj-W8H1gEqY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    setEmailSent(true)
    setName("")
    setEmail("")
    setContent("")
  };
  const changeName=(e)=>{
    e.preventDefault()
    setName(e.target.value1)
  }
  const changeEmail=(e)=>{
    e.preventDefault()
    setEmail(e.target.value1)
  }
  const changeContent=(e)=>{
    e.preventDefault()
    setContent(e.target.value1)
  }
  return (
    <div className='flex flex-col items-center h-screen pb-10'>
        <Header />
        <div className='flex items-center justify-center h-screen'>
            <div>
            <img src={EmailLogo} alt="Email-icon" />
            </div>
            <div>
                <form ref={form} onSubmit={sendEmail}>
                    <div className='uppercase font-bold pt-1 text-xl'>Reach Me out by sending a mail!!!!</div>
                    <div className='uppercase font-bold pt-10 text-lg'>Your Name</div>
                    <input type="text" value={name} onChange={changeName} name="user_name" className='border-2 w-1/2' />
                    <div className='uppercase font-bold pt-1 text-lg'>Your email</div>
                    <input type="email" value={email} onChange={changeEmail} name="user_email" className='border-2 w-1/2' />
                    <div className='uppercase font-bold pt-1 text-lg'>Enter your query</div>
                    <textarea rows={5} value={content} onChange={changeContent} className='border-2 w-3/4' name="message" />
                    <br />
                    {
                    !emailSent ? (
                        <button className='border-2 bg-gray-100 p-1 mb-10 w-1/4 font-semibold' type="submit">Send</button>
                    ) : (<div>
                            <div className='font-semibold text-blue-400'>Email sent successfully!!!</div>
                            <button className='border-2 bg-gray-100 p-1 mb-10 w-1/4 font-semibold' type="submit">Send</button>
                        </div>)
                    }
                </form>
                </div>
        </div>
    </div>
  )
}

export default Index