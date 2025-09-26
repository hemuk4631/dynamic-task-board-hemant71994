import React from 'react';
import { useTaskBoard } from '../context/taskBoardProvider';
import TaskCols from './TaskCols';
function TaskBoard() {
  const { cols, addCol } = useTaskBoard();
  return (
    <div>
      <div className='flex justify-end mb-3'>
        <button onClick={() => addCol('new')}>Add new column</button>
      </div>
      <div className="flex gap-6">
        {Object.values(cols).map((col) => (
          <TaskCols key={col?.id} col={col} />
        ))}
      </div>
    </div>
  );
}
export default TaskBoard;
