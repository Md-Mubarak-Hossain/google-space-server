const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("task server!");
});
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@messengercluster.z2rf1zn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("programmingSchool");
    const taskCollection = database.collection("task");

    app.get("/mytask", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/mytask/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });
    app.post("/mytask", async (req, res) => {
      const user = req.body;
      const result = await taskCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });
    app.put("/mytask/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = {
        _id: ObjectId(id),
      };
      const task = req.body;
      console.log(task);
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: taskname,
          email,
          image,
          description,
        },
      };
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
      console.log(result);
    });
    app.delete("/mytask/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
