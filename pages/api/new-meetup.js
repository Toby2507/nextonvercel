import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const client = await MongoClient.connect('mongodb+srv://nexttest:tobi1&onlY@tobytodo.miw4lu4.mongodb.net/NextTest?retryWrites=true&w=majority');
    const db = client.db();

    const collection = db.collection('NextTest');
    await collection.insertOne(req.body);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}