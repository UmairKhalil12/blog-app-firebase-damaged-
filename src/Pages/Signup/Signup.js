import React, { useState } from 'react'
import './Signup.css'
import Label from '../../Components/Label/Label'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
//import useStore from '../../Utility/Zustand/Zustand'
import { auth } from '../../Utility/Firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Heading from '../../Components/Heading/Heading'


export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePass = (e) => {
    setPass(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleSignup = async (event) => {
    event.preventDefault();
    if (name && email && pass) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(user, { displayName: name });
        navigate('/home');
      }
      catch (error) {
        toast.error('Error creating user');
        console.log(error);
        console.log(error.message);
        console.log(error.code);
      }

    }
    else {
      toast.error("All fields are required");
    }

  }



  return (
    <>
      <div className='main-signup'>
        <form className='form-main-div' onSubmit={handleSignup}>
          <Heading text='Sign-up' />
          <Label text='Enter your full name ' />
          <Input type='text' onChange={handleName} />

          <Label text='Enter your email' />
          <Input type='email' onChange={handleEmail} />

          <Label text='Enter your password' />
          <Input type='password' onChange={handlePass} />

          <Button text='Signup' type='submit' />

          <p className='form-link-p' onClick={() => navigate('/login')}>Already have an account?</p>

        </form>
      </div>
      <ToastContainer />
    </>
  )
}
