import './Login.css'
import Label from '../../Components/Label/Label'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
//import useStore from '../../Utility/Zustand/Zustand'
import { auth } from '../../Utility/Firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import Heading from '../../Components/Heading/Heading'


export default function Login() {
  // const { name} = useStore();

  // const [name , setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePass = (event) => {
    setPass(event.target.value);
  }


  // console.log('login name', name)
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
      toast.success("Logged in Successfully")
      // userCredential.user.displayName = name;
      // userInfo.displayName = name;
      // console.log('insideSignInWithEmailandPassword', userInfo.displayName)
      navigate('/home')
    })
      .catch((error) => {
        toast.error("Error logging in", error.message)
        console.log("Error logging in ", error)
        console.log("Error logging in ,error message ", error.message)
        console.log("Error logging in ,error message ", error.code)
      })

  }

  return (
    <>
      <div className='form-main'>
        <form className='form-main-div' onSubmit={handleLogin}>
          <Heading text='Log-in' />
          <Label text='Enter your Email' />
          <Input type='email' onChange={handleEmail} placeholder='Email' />

          <Label text='Enter your password' />
          <Input type='password' onChange={handlePass} placeholder='Password' />

          <Button text='Login' />

          <p className='form-link-p' onClick={() => navigate('/forgetpassword')}>Forget Password?</p>

          <p className='form-link-p' onClick={() => navigate('/signup')}>Don't have an Account? Signup</p>


        </form>
      </div>

      <ToastContainer />
    </>
  )
}
