import logo from './logo.svg';
import './App.css';
import User from './components/User';
import Navbar from './components/Navbar';
import AllUsers from './components/AllUsers';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { UserProvider } from './UserContext';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faPenToSquare, fas } from '@fortawesome/free-solid-svg-icons'
// library.add(fas, faPenToSquare)
function App() {
  return (
    <UserProvider>
      <div className='mainDiv '>
        <Home/>
      </div>
    </UserProvider>
  );
}

export default App;
