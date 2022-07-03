import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import TaskPainel from './pages/TaskPainel/TaskPainel';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/painel/:id' element={<TaskPainel/>} />
    </Routes>
  );
}

export default App;
