import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Routing from './Pages/Routing/Routing';
import User from './Utility/User/User';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routing />
      <User />


    </div>
  );
}

export default App;
