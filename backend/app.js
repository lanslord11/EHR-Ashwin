// create an express server

const express = require("express");
const { connectDB, Doc } = require("./db");
// cors
const cors = require("cors");
const app = express();
const port = 5000;

//connect to the database
connectDB();

// accept url encoded data in json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

//create a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//create a route to upload a document with the following fields
// Pid, fhash, Tf, Kw, fec;
// asynchronously
app.post("/upload", async (req, res) => {
  const { Pid, fhash, Tf, Kw, fec } = req.body;
  console.log(req.body);
  console.log(Pid, fhash, Tf, Kw, fec);
  const doc = new Doc({ Pid, fhash, Tf, Kw, fec });
  try {
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/search", async (req, res) => {
  console.log(req.query);
  const { Tf, Kw, start, end } = req.query;
  let query = { Tf, Kw: { $regex: new RegExp(Kw), $options: 'i' } };
  
  if (start && end) {
    query.timestamp = { $gte: start, $lte: end };
  } else if (start) {
    query.timestamp = { $gte: start };
  } else if (end) {
    query.timestamp = { $lte: end };
  }

  try {
    const result = await Doc.find(query);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//listen to the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});