import React, { useState } from 'react'
import './ForgetPassword.css'
import Label from '../../Components/Label/Label'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../Utility/Firebase/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Heading/Heading'

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [email , setEmail ] = useState();

    const handleEmail = (event) =>{
        setEmail(event.targe.value); 
    }
    const handlePasswordResetHandler = (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success('Password reset email sent successfully');
            navigate('/login')
        })
            .catch((error) => {
                toast.error("Error sending link");
                console.log("error sending password reset link", error.message);
            })
    }
    return (
        <div className='main-forget-pass-form'>
            <form className='forget-pass-form' onSubmit={handlePasswordResetHandler}>
                <Heading text='Forget Password' />
                <Label text='Enter your email' />
                <Input type='email' onChange={handleEmail} value={email} />
                <Button text='Send reset link' type='submit' />
            </form>
            <ToastContainer />
        </div>
    )
}
