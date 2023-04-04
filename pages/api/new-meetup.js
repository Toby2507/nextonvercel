import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const client = await MongoClient.connect('mongodb://localhost:27017/meetupnext');
    const db = client.db();

    const meetupsCollection = db.collection('meetupnext');
    const response = await meetupsCollection.insertOne(req.body);
    console.log(response);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}