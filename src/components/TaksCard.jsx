import React, { useState } from 'react';
import { useTaskBoard } from '../context/TaskBoardProvider';
import moment from 'moment';
const TaksCard = ({ taskId, colId }) => {
  const { tasks, updateTask, deleteTask } = useTaskBoard();
  const [editing, setEditing] = useState(false);
  const [inputValue, setinputValue] = useState(tasks[taskId]?.title || '');
  const [textAreaVal, settextAreaVal] = useState(
    tasks[taskId]?.description || ''
  );
  if (!tasks[taskId]) return null;
  const saveEdit = () => {
    console.log(taskId);
    updateTask(taskId, inputValue, textAreaVal);
    setEditing(false);
  };
  const enableEdit = () => {
    setinputValue(tasks[taskId]?.title);
    setEditing(true);
  };
  return (
    <div className="  rounded shadow relative bg-white p-3 h-full">
      {editing ? (
        <div className=" flex-col flex gap-2 w-full">
          <input
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            // onBlur={saveEdit}
            placeholder="Title"
            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            autoFocus
            className=" border rounded w-full  h-8 p-2 font-semibold outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={textAreaVal}
            onChange={(e) => settextAreaVal(e.target.value)}
            className="p-2 border rounded w-full outline-none text-sm"
            // onBlur={saveEdit}
          />
        </div>
      ) : (
        <div className="overflow-scroll">
          <h2 onClick={enableEdit} className="font-semibold text-black">
            {tasks[taskId]?.title}
          </h2>
          <p className="text-sm">{tasks[taskId]?.description}</p>
        </div>
      )}

      {!editing ? (
        <div className="flex  absolute right-0 -bottom-2 gap-1">
          <img onClick={enableEdit} src="./edit.svg" className="size-5" />
          <img
            onClick={() => deleteTask(colId, taskId)}
            src="./delete.svg"
            className="size-5"
          />
        </div>
      ) : (
        <img
          onClick={saveEdit}
          src="./approve.svg"
          className="absolute right-0 -bottom-2 size-6 cursor-pointer"
        />
      )}
      <div className=" text-start flex gap-1 text-blue-500 text-[10px]">
        <div className="font-semibold">Last Updated:</div>
        <span>
          {moment(tasks[taskId]?.updatedAt || tasks[taskId]?.createdAt).format(
            'lll'
          )}
        </span>
      </div>
    </div>
  );
};
export default TaksCard;
