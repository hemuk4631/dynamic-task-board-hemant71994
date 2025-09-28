import React, { useState } from 'react';
import { useTaskBoard } from '../context/TaskBoardProvider';
import TaksCard from './TaksCard';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import Sortable from './Sortable';
const TaskColumn = ({ colId }) => {
  const { cols, addTask, deleteColumn } = useTaskBoard();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [newForm, setNewFrom] = useState(false);
  const { setNodeRef } = useDroppable({ id: `col-${colId}` });
  const col = cols[colId];
  return (
    <div className="relative">

        <img
          src="./cross.svg"
          alt="del"
          onClick={() => {
            deleteColumn(col?.id);
          }}
          style={{zIndex: 51}}
          className=" dark:bg-gray-300  absolute -right-2 -top-2 bg-gray-200 size-6 cursor-pointer dark:invert rounded-full p-1 "
        />


      <div
        ref={setNodeRef}
        className="bg-blue-50 dark:bg-gray-600 px-4 pb-4 rounded min-w-72 w-96 flex-shrink-0  h-[36rem] overflow-y-scroll"
      >
        <div className="sticky top-0 font-bold mb-3 text-center z-50 py-2 -mx-4 dark:bg-blue-950 bg-blue-300 text-white" >{col?.title}</div>
        <SortableContext
          items={col?.taskIds || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {col?.taskIds?.map((taskId) => (
              <Sortable key={taskId} id={taskId}>
                <TaksCard taskId={taskId} colId={colId} />
              </Sortable>
            ))}
          </div>
        </SortableContext>
        {!newForm && (
          <div
            onClick={() => setNewFrom(true)}
            className="flex justify-end mt-3 p-2 dark:bg-gray-700 rounded-sm bg-gray-200 w-fit text-sm cursor-pointer"
          >
            + Add New
          </div>
        )}
        {newForm && (
          <div className="mt-3">
            <input
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 h-8 rounded border outline-none mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="p-2 border rounded w-full outline-none text-sm"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (!(title || desc)) return;
                  addTask(colId, title, desc);
                  setTitle('');
                  setDesc('');
                  setNewFrom(false);
                }}
                className="text-white   w-full mt-2"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setNewFrom(false);
                  setDesc('');
                  setTitle('');
                }}
                className="  text-white   w-full mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskColumn;
