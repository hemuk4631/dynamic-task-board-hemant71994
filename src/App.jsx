import React from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <>
      <h1 className='mb-4'>Task Board</h1>
      <div className='p-8 border border-blue-300 rounded-2xl overflow-scroll'>
        <TaskBoard />
      </div>
    </>
  );
}

export default App;
