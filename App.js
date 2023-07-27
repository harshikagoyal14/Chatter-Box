import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {Route,Routes} from "react-router-dom";
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';


function App() {
  return (
    <div className="App">
    <Routes>
   <Route path='/' component={HomePage} exact />
   <Route path='/chats' component={ChatPage} />
    </Routes>
    </div>
  );
}

export default App;
