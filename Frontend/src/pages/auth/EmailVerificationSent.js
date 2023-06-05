import { Button } from '@material-ui/core';
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function EmailVerificationSent() {
    const auth = getAuth();
    const [user,setUser]=useState();
    const navigate = useNavigate();
    const handleVerification=()=>{
        auth.currentUser.reload()
        console.log(auth.currentUser.emailVerified);
        if(auth.currentUser.emailVerified==false){
            alert("Email not yet verified")
        }
        else{
            console.log("Neg");
            navigate("/user-info")
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-3xl font-bold mb-8">Email Verification Sent</div>
            <div className="mb-8">After completing the verification process,
                <Button variant="contained" color="primary" onClick={handleVerification} className="ml-2">Click Here</Button>
            </div>
        </div>
    )
}

export default EmailVerificationSent
