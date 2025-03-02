import { Client, Databases } from "appwrite";

export const client = new Client()
                    .setEndpoint('https://cloud.appwrite.io/v1')
                    .setProject('67bd2e1f003893f788c5')

export const databases = new Databases(client)

