import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import About from "./components/About";
import Home from "./components/Home";
import Navbar from './components/Navbar';
import NoteState from './context/note/NoteState';
import AllNotes from './components/AllNotes';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState({});

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert({});
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert message={alert.message} type={alert.type} />
          <div className="container">
            <Routes>
              <Route element={<Home showAlert={showAlert} />} exact path='/' />
              <Route element={<About />} exact path='/about' />
              <Route element={<AllNotes showAlert={showAlert} />} exact path='/notes' />
              <Route element={<Login showAlert={showAlert} />} exact path='/login' />
              <Route element={<Signup showAlert={showAlert} />} exact path='/signup' />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
