import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const TaskboardContext = createContext();

export const useTaskBoard = () => useContext(TaskboardContext);

const TaskBoardProvider = ({ children }) => {
  const colsData = {
    col1: {
      id: 'col1',
      title: 'To do',
      taskIds: ['t1'],
    },
    col2: {
      id: 'col2',
      title: 'In progress',
      taskIds: ['t2'],
    },
    col3: {
      id: 'col3',
      title: 'Done',
      taskIds: ['t3'],
    },
  };
  const taskData = {
    t1: {
      id: 't1',
      title: 'fsdwdwd',
      description: 'dfdfdfdfdfdfdfdfdfdf dfdfdfd dfdfdfd',
    },
    t2: {
      id: 't2',
      title: 'fsdwdwd',
      description: 'dfdfdfdfdfdfdfdfdfdf dfdfdfd dfdfdfd ',
    },
  };
  const [tasks, setTasks] = useState(taskData);
  const [cols, setCols] = useState(colsData);
  console.log(cols);
  const addCol = (title) => {
    const id = uuidv4();
    setCols((pre) => ({
      ...pre,
      [id]: { id, title: title, taskIds: [] },
    }));
  };
  const addTask = (colId, title) => {
    console.log(colId);
    console.log(title);
    const id = uuidv4();
    setTasks((pre) => ({
      ...pre,
      [id]: { id, title: title },
    }));
    setCols((pre) => ({
      ...pre,
      [colId]: {
        ...pre[colId],
        taskIds: [...pre[colId].taskIds, id],
      },
    }));
  };
  return (
    <TaskboardContext.Provider
      value={{ cols, tasks, addCol, addTask, setTasks, setCols }}
    >
      {children}
    </TaskboardContext.Provider>
  );
};
export default TaskBoardProvider;
