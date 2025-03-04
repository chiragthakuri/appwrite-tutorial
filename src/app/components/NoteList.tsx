'use client'
import { useEffect, useState} from 'react'
import { deleteNote } from '../actions/noteActions';
import { client } from '@/utils/appwrite';

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)

  useEffect(() =>{
    const channel = 'databases.notesApp.collections.notes.documents'
    const unsubscribe = client.subscribe(channel, (response)=>{
      const eventType = response.events[0];
      console.log(eventType);

      const changedNote = response.payload as Note
      console.log(response.payload);

      if(eventType.includes('create')){
        setNotes(prevNotes =>[changedNote, ...prevNotes]);
      }

      if(eventType.includes('delete')){
        console.log("Deleted Note ID:", changedNote.$id);
        console.log("Deleted Note Content:", changedNote.content);
        setNotes(prevNotes => 
          prevNotes.filter((note) => note.$id !== changedNote.$id )
          
        )
        
      }
    })
    return () => unsubscribe();
  },[])

  const handleDelete = async (noteId: string) => {
      const element = document.getElementById(noteId);

      if(element){
        element.classList.add('crossed-out')
      }

      await deleteNote(noteId);
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  )
}
