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
