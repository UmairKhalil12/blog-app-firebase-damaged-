import { Routes, Route } from "react-router-dom";
import Details from '../Details/Details'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import AddEditBlog from '../AddEditBlog/AddEditBlog'
import About from '../About/About'
//import NoPage from "../NoPage/NoPage";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import useStore from "../../Utility/Zustand/Zustand";
// import ErrorPage from "../ErrorPage/ErrorPage";
import HomePage from "../HomePage/HomePage";
import TagBlog from "../TagBlog/TagBlog";
import CategoryBlog from "../CategoryBlog/CategoryBlog";


export default function Routing() {
    const { user } = useStore();
    // console.log('routing', user)
    return (
        <Routes>
            {user ? null : <Route path="/login" element={<Login />} />}
            <Route path="/home" element={<HomePage /> } />
            <Route path = '/' element = {<HomePage />} /> 
            {user ? null : <Route path="/signup" element={<Signup />} />}
            <Route path="/detail/:id" element={<Details />} />
            {user ? <Route path="/update/:id" element={<AddEditBlog />} /> : null}
            {user ? <Route path="/create" element={<AddEditBlog />} /> : null}
            {user ? <Route path="/addedit" element={<AddEditBlog />} /> : null}
            <Route path="/about" element={<About />} />
            {user ? null : <Route path="/forgetpassword" element={<ForgetPassword />} />}
            <Route path="/search" element={<HomePage />} />
            <Route path="/tag/:tag" element={<TagBlog />} />
            <Route path="/category/:category" element={<CategoryBlog />} />
           
        </Routes>
    )
}
