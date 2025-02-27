import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import './App.css'
import Login from './components/Login-Component/Login'
import Verify from './components/Verify-Component/verify'
import UserLogin from './components/UserLogin-Component/UserLogin'

const App = () =>{
  return( 
    <Router>
      <Routes>
      <Route path="/" element={ <Login/>} />
      <Route path="/verifyotp" element={ <Verify/>} />
      <Route path="/login" element={ <UserLogin/>} />
      </Routes>   
    </Router>
  );
}
export default App
