import React,{useState} from 'react'
import Header from '../../components/Header';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithPopup,sendEmailVerification, GoogleAuthProvider,createUserWithEmailAndPassword,FacebookAuthProvider } from "firebase/auth";
import axios from 'axios';
import firebase from "firebase/app";
export default function SignUp() {
    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const googleSignIn=()=>{
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                socialSignup(user.email,user.uid)
                navigate("/user-info")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    const facebookSignIn=()=>{
        signInWithPopup(auth, facebookprovider)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            socialSignup(user.email,user.uid)
            navigate("/user-info")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
    const socialSignup = (email,uid) => {
        axios.post("/signup",{
            email:email,
            logintype:"social",
            uid
        }).then(res => {
            console.log(res)
            if(res.data.error){
                alert(res.data.error)
            }
            else{
                navigate("/user-info")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    const onSubmit = (e) => {
        // window.location.href='/user-info'
        if(password.length>5){
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                // send verification mail.
              sendEmailVerification(auth.currentUser)
                .then((res)=>{
                    console.log(res);
                })
            navigate("/email-verification")
            })
            .catch(alert);
        e.preventDefault()
        axios.post("/signup",{
            email:email,
            name:name,
            password:password,
            uid: auth.currentUser.uid,
            logintype:"email"
        }).then(res => {
            console.log(res)
            if(res.data.error){
                alert(res.data.error)
            }
            else{
                navigate("/signin")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })}
        else{
            alert("Password should be atleast 6 characters")
        }
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center justify-center m-10'>
                <h4 className='m-2'><b>Register here</b></h4>
                <form className='bg-white shadow-md rounded-lg p-8'>
                    <div>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="your-name">
                            Name
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                            required
                            placeholder="Enter name"
                        />
                    </div>
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
                    <div>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            label="Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required                                 
                            placeholder="Re-enter password"              
                        />
                    </div>                                               */}
                    <br></br>
                    <div  className='mb-6'>
                        <button
                            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                            type="submit" 
                            onClick={onSubmit}
                        > 
                            Sign Up
                        </button>  
                    </div>
                    <p className="text-sm text-black text-center">
                        Already have an account? {' '}
                        <Link to="/signin">
                            Sign In
                        </Link>
                    </p>
                </form> 
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                        <text>OR</text>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-around'>
                    <button
                        className='bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50'
                        onClick={facebookSignIn}
                    >
                        <div className='flex justify-around'>
                            <text>Continue with Facebook</text>
                            <img src="https://img.icons8.com/material/24/ffffff/facebook-f.png"/>
                        </div>
                    </button>
                    <button
                        className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 mt-4'
                        onClick={googleSignIn}
                    >
                        <div className='flex'>
                            <text>Continue with Google</text>
                            <img src="https://img.icons8.com/material/24/ffffff/google-logo--v1.png"/>
                        </div>
                    </button>
                </div>
            </div>
    </div>
    )
}