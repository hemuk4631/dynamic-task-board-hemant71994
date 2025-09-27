import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const Sortable = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const newListeners = {
    ...listeners,
    onPointerDown: (e) => {
      console.log(e)
      const target = e.target;
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'IMG'].includes(target.tagName)) {
        return;
      }
      listeners?.onPointerDown(e);
    },
  };
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: 'grab',
    opacity: isDragging ? 0 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...newListeners}>
      {children}
    </div>
  );
};
export default Sortable;
