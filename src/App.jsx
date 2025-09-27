import React, { useState } from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';
import { useTaskBoard } from './context/TaskBoardProvider';
import moment from 'moment';
function App() {
  const { addColumn, loading, liveUers } = useTaskBoard();
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);

  console.log(liveUers);
  // if (loading) {
  //   return <div className="text-black">loading....</div>;
  // }
  return (
    <div className=" border border-blue-300 p-8 m-auto rounded-2xl w-7xl min-h-[40rem]">
      <div>
        <div className="flex justify-between items-center px-4">
          <div className="relative px-3 py-1 bg-green-300 rounded-md ">
            Online
            <div
              className="absolute -top-2 -right-2 px-2 rounded-full bg-blue-200 cursor-pointer"
              onClick={() => setShow(true)}
            >
              {liveUers?.length || ''}
            </div>
            {show && (
              <div
                className="flex flex-col gap-y-3 absolute text-start min-w-fit max-h-96 overflow-y-scroll -top-20 bg-blue-200 p-7 rounded-md"
                style={{ zIndex: 100 }}
              >
                <img
                  src="./cross.svg"
                  onClick={() => setShow(false)}
                  className="size-6 absolute top-1 right-1"
                />

                {liveUers?.length > 0 &&
                  show &&
                  liveUers?.map((ele) => (
                    <div className=" text-sm bg-white p-4 rounded-md">
                      <div className="whitespace-nowrap flex gap-1">
                        <h2 className="font-semibold">UserId: </h2>
                        {ele?.userId}
                      </div>
                      <div className="flex gap-2 text-[9px] text-blue-500">
                        <h2 className="font-semibold">Last seen:</h2>
                        <div>{moment(ele?.lastSeen).format('lll')}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

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
    </div>
  );
}
export default App;
