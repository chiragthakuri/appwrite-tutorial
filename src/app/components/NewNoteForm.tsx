'use client'
import { useState } from 'react'
import { addNote } from '../actions/noteActions';

const NewNoteForm = () => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🚀 Form submitted with content:", content);

    if (content.trim() !== '') {
        const result = await addNote(content);
        console.log("✅ addNote result:", result);
        setContent('');
    } else {
        console.warn("⚠️ Content is empty, skipping note creation.");
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NewNoteForm