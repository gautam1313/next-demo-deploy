import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // const { image, title, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://Sebastian:Sebastian@cluster0.rksqy.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Meet up inserted!" });
  }
};

export default handler;
