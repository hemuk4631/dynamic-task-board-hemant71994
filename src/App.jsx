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
  console.log(loading);
  return (
    <div className="relative dark:bg-gray-700 dark:text-white border border-blue-300 p-8 m-auto rounded-2xl w-7xl min-h-[40rem]">
      {loading ? (
        <div className="text-4xl absolute left-[50%]  top-[50%] -translate-x-1/2 -translate-y-1/2 font-extrabold">
          loading.....
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center px-4">
            <div className="relative px-3 py-1  rounded-full ">
              <img src="./user.svg" alt="" className="size-10" />
              <div
                className="absolute -top-0.5 -right-0.5 px-2 rounded-full dark:bg-blue-700 bg-blue-200 cursor-pointer"
                onClick={() => setShow(true)}
                title="View"
              >
                {liveUers?.length || ''}
              </div>
              {show && (
                <div
                  className="flex flex-col gap-y-3 absolute text-start min-w-fit max-h-96 overflow-y-scroll -top-15 bg-blue-200 p-7 rounded-md"
                  style={{ zIndex: 100 }}
                >
                  <img
                    src="./cross.svg"
                    onClick={() => setShow(false)}
                    className=" absolute top-1 right-1 bg-gray-200 size-6 dark:bg-gray-300 cursor-pointer dark:invert  rounded-full p-1"
                  />
                  {liveUers?.length > 0 &&
                    show &&
                    liveUers?.map((ele) => (
                      <div className=" text-sm bg-white p-4 rounded-md flex items-center gap-2 w-max">
                        <img src="./user.svg" alt="" className="size-8" />
                        <div className="">
                          <div className="whitespace-nowrap text-black flex gap-1">
                            <h2 className="font-semibold">UserId: </h2>
                            {ele?.userId}
                          </div>
                          <div className="flex gap-2 text-[9px] text-blue-500">
                            <h2 className="font-semibold">Last seen:</h2>
                            <div>{moment(ele?.lastSeen).format('lll')}</div>
                          </div>
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
            <div className="flex gap-2 justify-end items-center mt-3 mb-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" px-2 py-1 text-sm border rounded outline-none"
                placeholder="Title"
              />
              <img
                src="./approve.svg"
                onClick={() => {
                  if (!title) return;
                  addColumn(title);
                  setForm(false);
                  setTitle('');
                }}
                title="Add"
                className=" bg-gray-200  rounded-full  size-7 dark:bg-gray-300"
              />
              <img
                src="./cross.svg"
                onClick={() => {
                  setForm(false);
                  setTitle('');
                }}
                className="p-1 bg-gray-200 cursor-pointer   rounded-full dark:invert dark:size-7 size-6 dark:bg-gray-300"
              />
            </div>
          )}
          <TaskBoard />
        </div>
      )}
    </div>
  );
}
export default App;
