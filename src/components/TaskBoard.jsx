import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import { useTaskBoard } from '../context/TaskBoardProvider';
import TaksCard from './TaksCard';
import {
  closestCenter,
  useSensors,
  PointerSensor,
  useSensor,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
const TaskBoard = () => {
  const { columnOrder, cols, dragTask } = useTaskBoard();
  console.log(columnOrder);
  const sensor = useSensors(useSensor(PointerSensor));
  const [activeid, setActiveId] = useState(null);

  const onEndDrag = (e) => {
    if (!e.over) return;
    if (e.active.id === e.over.id) return;
    const sourceCol = Object.keys(cols).find((ele) =>
      (cols[ele].taskIds || []).includes(e.active.id)
    );
    if (!sourceCol) return;
    let toCol = null;
    let toIndex = 0;
    if (typeof e.over.id === 'string' && e.over.id?.startsWith('col-')) {
      toCol = e.over.id?.replace('col-', '');
      toIndex = (cols[toCol]?.taskIds || []).length;
    } else {
      toCol = Object.keys(cols).find((ele) =>
        (cols[ele].taskIds || []).includes(e.over.id)
      );
      toIndex = cols[toCol].taskIds.indexOf(e.over.id);
    }
    if (!toCol) return;
    dragTask(sourceCol, toCol, e.active.id, toIndex);
    setActiveId(null);
  };
  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCenter}
      onDragStart={(e) => {
        setActiveId(e.active.id);

        console.log(activeid);
      }}
      onDragEnd={onEndDrag}
    >
      <div className="flex gap-4  overflow-x-scroll p-4">
        {columnOrder?.map((colId) => (
          <TaskColumn key={colId} colId={colId} />
        ))}
      </div>
      <DragOverlay>
        {activeid ? <TaksCard taskId={activeid} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
export default TaskBoard;
