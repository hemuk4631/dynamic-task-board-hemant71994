import React from 'react';
import TaskCard from './TaskCard';
import { useTaskBoard } from '../context/taskBoardProvider';
function TaskCols({ col }) {
  const { tasks, addTask } = useTaskBoard();
  console.log(tasks);
  console.log(col?.id);

  return (
    <div className="flex flex-col gap-y-4 shadow  rounded p-6 min-h-96 w-72">
      <input
        type="text"
        value={col?.title}
        className="outline-none text-center font-bold text-xl text-blue-900"
      />
      <div className="flex flex-col gap-y-6">
        {col?.taskIds?.map((id) => (
          <TaskCard key={id} task={tasks[id]} />
        ))}
      </div>
      <button onClick={() => addTask(col?.id, 'new task')} className="">
        Add new task
      </button>
    </div>
  );
}

export default TaskCols;
