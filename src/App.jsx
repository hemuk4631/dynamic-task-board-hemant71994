import React, { useState } from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';
import { useTaskBoard } from '../src/context/TaskBoardProvider';
function App() {
  const { addColumn, loading } = useTaskBoard();
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState('');
  // if (loading) {
  //   return <div>loading....</div>;
  // }
  return (
    <div className=" border border-blue-300 p-8 m-auto rounded-2xl w-7xl min-h-[40rem]">
      <div className="flex justify-end px-4">
        <button className="text-white" onClick={() => setForm(true)}>
          Add New column
        </button>
      </div>
      {form && (
        <div className="flex gap-2 justify-end  mt-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" px-2 py-1 text-sm border"
            placeholder="column Title"
          />
          <img
            src="./approve.svg"
            onClick={() => {
              if (!title) return;
              addColumn(title);
              setForm(false);
              setTitle('');
            }}
          />
          <img
            src="./cross.svg"
            onClick={() => {
              setForm(false);
              setTitle('');
            }}
            // className="p-1 bg-blue-200 border rounded-full"
          />
        </div>
      )}
      <TaskBoard />
    </div>
  );
}
export default App;
