import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  onValue,
  update,
  remove,
  ref,
  onDisconnect,
  set,
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const TaskBoardContext = createContext();
export const useTaskBoard = () => useContext(TaskBoardContext);
export const TaskBoardProvider = ({ children }) => {
  const [cols, setCols] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);

  const [columnOrder, setColumnOrder] = useState([]);

  const [liveUers, setLiveUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const board1Ref = ref(db, `boards/board1`);
    onValue(board1Ref, (snap) => {
      const data = snap.val();
      if (data) {
        setCols(data?.columns || {});
        setColumnOrder(data?.columnOrder || []);
        setLoading(false);
      }
    });
    const taksRef = ref(db, 'tasks');
    onValue(taksRef, (snap) => setTasks(snap.val() || {}));
    setLoading(false);
  }, [update]);
  const addColumn = (title) => {
    const id = uuidv4();
    update(ref(db), {
      [`boards/board1/columns/${id}`]: { id, title, taskIds: [] },
      [`boards/board1/columnOrder`]: [...columnOrder, id],
    });
  };
  const deleteColumn = (id) => {
    update(ref(db), {
      [`boards/board1/columnOrder`]: columnOrder.filter((ele) => ele !== id),
    });
    remove(ref(db, `boards/board1/columns/${id}`));
  };
  const updateColumn = (id, title) => {
    update(ref(db, `boards/board1/columns/${id}`), { title });
  };

  const dragTask = (fromColId, toColId, taskId, toInd) => {
    const fromIds = Array.from(cols[fromColId]?.taskIds || []);
    const toIds = Array.from(cols[toColId]?.taskIds || []);
    const filteredFrom = fromIds?.filter((id) => id !== taskId);
    if (fromColId === toColId) {
      filteredFrom?.splice(toInd, 0, taskId);
      const updates = {};
      updates[`boards/board1/columns/${fromColId}/taskIds`] = filteredFrom;
      update(ref(db), updates);
      return;
    }
    const newTo = Array.from(toIds);
    if (!newTo?.includes(taskId)) {
      newTo.splice(toInd, 0, taskId);
    } else {
      const tmp = newTo?.filter((id) => id !== taskId);
      tmp.splice(toInd, 0, taskId);
      for (let i = 0; i < 1; i++) newTo?.pop();
      newTo.length = tmp.length;
      newTo?.splice(0, newTo?.length, ...tmp);
    }
    const updates = {};
    updates[`boards/board1/columns/${fromColId}/taskIds`] = filteredFrom;
    updates[`boards/board1/columns/${toColId}/taskIds`] = newTo;
    update(ref(db), updates);
  };
  const addTask = (colId, title, description) => {
    const id = uuidv4();
    const task = {
      id,
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const taaskId = cols[colId]?.taskIds || [];
    console.log(taaskId);
    const updates = {};
    updates[`tasks/${id}`] = task;
    updates[`boards/board1/columns/${colId}/taskIds`] = [...taaskId, id];
    update(ref(db), updates);
  };
  const updateTask = (id, title, description) => {
    update(ref(db, `tasks/${id}`), {
      title,
      description,
      updatedAt: new Date().toISOString(),
    });
  };
  const deleteTask = (colId, taskId) => {
    console.log(colId);
    console.log(taskId);
    const filtered = (cols[colId]?.taskIds || [])?.filter(
      (ele) => ele !== taskId
    );
    const updates = {};
    updates[`boards/board1/columns/${colId}/taskIds`] = filtered;
    updates[`tasks/${taskId}`] = null;
    update(ref(db), updates);
  };
  useEffect(() => {
    const usrId = uuidv4();
    const usrRef = ref(db, `presence/${usrId}`);
    const connected = ref(db, '.info/connected');
    const handlePresence = (snap) => {
      if (snap?.val() === true) {
        set(usrRef, {
          userId: usrId,
          online: true,
          lastSeen: new Date().toISOString(),
        });
        onDisconnect(usrRef).remove();
      }
    };
    onValue(connected, handlePresence);
    return () => {
      set(usrRef, {
        userId: usrId,
        online: false,
        lastSeen: new Date().toISOString(),
      });
    };
  }, []);
  useEffect(() => {
    const presence = ref(db, 'presence');
    onValue(presence, (snap) => {
      const val = snap?.val() || {};
      const usrs = Object.values(val)?.filter((ele) => ele?.online);
      setLiveUsers(usrs);
    });
  }, []);

  return (
    <TaskBoardContext.Provider
      value={{
        cols,
        columnOrder,
        tasks,
        addColumn,
        updateColumn,
        deleteColumn,
        addTask,
        updateTask,
        deleteTask,
        dragTask,
        loading,
        liveUers,
      }}
    >
      {children}
    </TaskBoardContext.Provider>
  );
};
