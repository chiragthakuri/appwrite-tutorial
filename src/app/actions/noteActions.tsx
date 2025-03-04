import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";

export async function addNote(content: string): Promise<Note | null> {
    try {
        console.log("Adding note:", content);

        const response = await databases.createDocument(
            'notesApp',
            'notes',
            ID.unique(),
            { content }
        );

        console.log("Note added successfully:", response);

        return {
            $id: response.$id,
            $createdAt: response.$createdAt,
            content: response.content
        };
    } catch (error) {
        console.error("❌ Failed to add note:", error);
        return null;
    }
}

export async function getNotes(): Promise<Note[]>{
    const response = await databases.listDocuments(
        'notesApp',
        'notes'
    )

    console.log(response.documents)

    const notes:Note[] = response.documents.map(doc => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        content: doc.content
    }));

    return notes;
}

export async function deleteNote(noteId: string){
    await databases.deleteDocument(
        'notesApp',
        'notes',
        noteId
    )
}
