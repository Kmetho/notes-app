"use client";

import { useState, useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import Header from "./Header";
import Form from "./Form";
import Note from "./Note";
import Footer from "./Footer";

const NOTE_WIDTH = 400;
const NOTE_HEIGHT = 200;
const MAX_NOTES = 10;

export interface NoteType {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  function bringToFront(id: string) {
    setNotes((prevNotes) => {
      const index = prevNotes.findIndex((n) => n.id === id);
      if (index === -1 || index === prevNotes.length - 1) return prevNotes;
      const reordered = [...prevNotes];
      reordered.push(reordered.splice(index, 1)[0]);
      return reordered;
    });
  }

  function handleDragEnd(event: any) {
    const id = event.operation?.source?.id;
    if (!id || id === "note-form") return;

    const noteId = id.toString().replace("note-", "");
    const transform = event.operation?.transform;

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          const newX = note.position.x + (transform?.x || 0);
          const newY = note.position.y + (transform?.y || 0);
          return {
            ...note,
            position: {
              x: Math.max(0, Math.min(newX, window.innerWidth - NOTE_WIDTH)),
              y: Math.max(0, Math.min(newY, window.innerHeight - NOTE_HEIGHT)),
            },
          };
        }
        return note;
      }),
    );
  }

  function handleDragStart(event: any) {
    const id = event.operation?.source?.id;
    if (!id || id === "note-form") return;

    const noteId = id.toString().replace("note-", "");
    setNotes((prevNotes) => {
      const index = prevNotes.findIndex((n) => n.id === noteId);
      if (index === -1) return prevNotes;
      const reordered = [...prevNotes];
      reordered.push(reordered.splice(index, 1)[0]);
      return reordered;
    });
  }

  return (
    <div>
      <Header />
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[{ plugin: RestrictToWindow }]}
      >
        <Form
          onAdd={addNote}
          isHidden={notes.length >= MAX_NOTES}
          currentCount={notes.length}
          maxCount={MAX_NOTES}
        />

        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            position={{
              x: Math.max(
                0,
                Math.min(note.position.x, windowSize.width - NOTE_WIDTH),
              ),
              y: Math.max(
                0,
                Math.min(note.position.y, windowSize.height - NOTE_HEIGHT),
              ),
            }}
            onDelete={deleteNote}
            onBringToFront={bringToFront}
          />
        ))}
      </DragDropProvider>
      <Footer />
    </div>
  );
}
