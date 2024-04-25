// api/new-meetup.js
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        // Your MongoDB connection string here
        'mongodb+srv://Test:Test%40123@cluster0.1d3gnzo.mongodb.net/meetups?retryWrites=true&w=majority'
      );
      const db = client.db('<database>');

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (error) {
      console.error('Error inserting meetup:', error);
      res.status(500).json({ message: 'Failed to insert meetup.', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
