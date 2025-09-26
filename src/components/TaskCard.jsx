import React from 'react';

function TaskCard({ task }) {
  console.log(task);
  return (
    <>
      {task && (
        <div className=" p-2 rounded-md shadow-md bg-blue-50 relative">
          <input
            className="font-semibold text-black text-center border-none outline-none"
            type="text"
            value={task?.title}
          />
          <textarea
            className="text-gray-600 text-sm  border-none outline-none"
            value={task?.description}
          />
          <div className="absolute right-1 -bottom-2 flex gap-2">
            <img src="./edit.svg" alt="" className="size-5 cursor-pointer" />

            <img src="./delete.svg" alt="" className="size-5 cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
