"use client";

import { useState, useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import Header from "./Header";
import Form from "./Form";
import Note from "./Note";
import Footer from "./Footer";

export interface NoteType {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomPosition(): { x: number; y: number } {
  const maxX =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth - 450, 800)
      : 400;
  const maxY =
    typeof window !== "undefined"
      ? Math.min(window.innerHeight - 300, 500)
      : 300;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
}

export default function NotesApp() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load notes:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, mounted]);

  function addNote(title: string, content: string) {
    const newNote: NoteType = {
      id: generateId(),
      title,
      content,
      position: getRandomPosition(),
    };
    setNotes([...notes, newNote]);
  }

  function deleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function handleDragEnd(event: any) {
    const id = event.operation?.source?.id;

    if (!id || id === "note-form") return;

    const noteId = id.toString().replace("note-", "");
    const transform = event.operation?.transform;

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            position: {
              x: note.position.x + (transform?.x || 0),
              y: note.position.y + (transform?.y || 0),
            },
          };
        }
        return note;
      }),
    );
  }

  const MAX_NOTES = 10;

  return (
    <div>
      <Header />
      <DragDropProvider
        onDragEnd={handleDragEnd}
        modifiers={[RestrictToWindow]}
      >
        {/* <div className="relative top-0 left-0 min-h-[calc(100vh-35px)]"> */}
          <Form
            onAdd={addNote}
            isHidden={notes.length >= MAX_NOTES}
            currentCount={notes.length}
            maxCount={MAX_NOTES}
          />
          <div>
            {notes.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                position={note.position}
                onDelete={deleteNote}
              />
            ))}
          </div>
        {/* </div> */}
      </DragDropProvider>
      <Footer />
    </div>
  );
}
