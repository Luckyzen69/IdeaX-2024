import { Client } from "appwrite";
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66f695ac0015f0f93ff8');

export {client}