"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/react";

interface FormProps {
  onAdd: (title: string, content: string) => void;
  isHidden: boolean;
  currentCount: number;
  maxCount: number;
}

export default function Form({
  onAdd,
  isHidden,
  currentCount,
  maxCount,
}: FormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { ref } = useDraggable({
    id: "note-form",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() && content.trim() && !isHidden) {
      onAdd(title, content);
      setTitle("");
      setContent("");
    }
  }

  if (isHidden) {
    return (
      <div className="fixed top-3 sm:top-5 right-3 sm:right-5 bg-white/95 border-2 border-[rgb(138,138,138)] rounded-[20px] px-3 sm:px-5 py-2.5 sm:py-3.5 z-[1000] animate-[slideIn_0.3s_ease]">
        <p className="font-fira-sans text-sm sm:text-base">
          Max notes reached! ({maxCount}) <br />
          Delete some to add more ✨
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="absolute top-[200px] sm:top-[400px] right-4 sm:right-[200px] z-10"
    >
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col bg-white border-2 border-[rgb(138,138,138)] rounded-[30px] p-3 sm:p-5 w-[400px] max-w-[90vw] shadow-md"
      >
        <input
          required
          maxLength={50}
          className="text-[1em] sm:text-[1.2em] mb-1.5 text-[rgb(138,138,138)] bg-transparent border-none w-full p-1.5 sm:p-2.5 placeholder:text-[rgb(138,138,138)] placeholder:opacity-50 focus:rounded-[10px] focus:outline focus:outline-1 focus:outline-gray-100"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="title"
        />
        <textarea
          required
          maxLength={150}
          className="h-[80px] sm:h-[100px] resize-none text-[0.95em] sm:text-[1.1em] text-[rgb(138,138,138)] bg-transparent border-none w-full p-1.5 sm:p-2.5 placeholder:text-[rgb(138,138,138)] placeholder:opacity-50 focus:rounded-[10px] focus:outline focus:outline-1 focus:outline-gray-100"
          onChange={(e) => setContent(e.target.value)}
          name="content"
          value={content}
          placeholder="content"
        />
        <small className="mt-2 sm:mt-2.5 opacity-50 text-center">
          {currentCount}/{maxCount} notes
        </small>
        <button
          type="submit"
          className="font-[Rubik_Bubbles] font-normal self-end text-[22px] sm:text-[30px] text-[rgb(138,138,138)] border-2 border-[rgb(138,138,138)] rounded-full p-2 sm:p-2.5 mt-2.5 -mb-10 bg-white hover:cursor-pointer hover:scale-105 hover:bg-gray-50 transition-all duration-200"
        >
          add
        </button>
      </form>
    </div>
  );
}
