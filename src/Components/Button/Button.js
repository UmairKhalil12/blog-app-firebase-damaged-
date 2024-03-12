import { useNavigate } from 'react-router-dom'
import './Button.css'
import {signOut } from "firebase/auth";
import { auth } from '../../Utility/Firebase/firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Button({ text, type  , disable }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (text === 'Signup') {
            navigate('/signup')
        }
        else if (text === 'Login') {
            navigate('/login')
        }
        else if (text === 'Signout') {
            signOut(auth).then(() => {
                toast.success("User logged out sucessfully")

            })
                .catch((error) => {
                    console.log("Error logging out user ", error.message)
                    toast.error("Error logging out user ", error.message)
                })
        }

      
    }
    return (
        <>
            <button className='navbar-btn' type={type} onClick={handleClick} disabled = {disable}  >{text}</button>
            <ToastContainer />
        </>
    )
}
