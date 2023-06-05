import React,{useState} from 'react'
import Header from '../components/Header';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    
    const onSubmit = (e) => {
        axios.post("/forgot-password",{
            email:email
        }).then(res => {
            console.log(res)
            if (res.data.error) {
                alert(res.data.error)
            } else{
                navigate("/email-verification")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center justify-center m-10'>
                <h4 className='m-2'><b>Enter your email</b></h4>
                <form className='bg-white shadow-md rounded-lg p-8'>
                    <div>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Enter email"                                
                        />
                    </div>
                    <br></br>
                    <div>
                        <button
                            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                            type="submit"
                            onClick={onSubmit}> 
                            Submit                            
                        </button>  
                    </div>       
                </form>
            </div>
        </div>
    )
}