"use client";

import { useDraggable } from "@dnd-kit/react";

interface NoteProps {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
  onDelete: (id: string) => void;
}

export default function Note({
  id,
  title,
  content,
  position,
  onDelete,
}: NoteProps) {
  const { ref } = useDraggable({
    id: `note-${id}`,
  });

  return (
    <div
      ref={ref}
      style={{ left: position.x, top: position.y }}
      className="fixed"
    >
      <div className="flex flex-col bg-white border-2 border-[rgb(138,138,138)] rounded-[30px] p-5 w-[400px] max-w-[90vw] shadow-md cursor-move">
        {/* <div className="cursor-move p-2.5 border-b border-gray-200 mb-2.5">
          <span className="text-xl">⋮⋮</span>
        </div> */}
        <h1 className="w-full p-2.5 text-[1.2em] mb-1.5 whitespace-pre-wrap break-words">
          {title}
        </h1>
        <p className="p-2.5 w-full text-[1.1em] whitespace-pre-wrap break-words">
          {content}
        </p>
        <button
          className="font-bubbles self-end text-[30px] text-[rgb(138,138,138)] border-2 border-[rgb(138,138,138)] rounded-full p-2.5 mt-2.5 -mb-10 bg-white hover:cursor-pointer hover:scale-105 hover:bg-gray-50 transition-all duration-200"
          onClick={() => onDelete(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}
