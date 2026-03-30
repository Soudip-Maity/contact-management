import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/loginpage';
import Register from './pages/registerpage';
function App() {
  return (
  <Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path='/home'element={<Home/>}/>
  </Routes>
  );
}

export default App;
