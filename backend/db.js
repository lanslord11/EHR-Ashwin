//create the db js for mongo db
const mongoose = require("mongoose");

//connect to the database
const dbAddress =
  "mongodb+srv://PiyushYadav:Lanslord11@crabcart.es0cqws.mongodb.net/Ecommerce?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(dbAddress, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};

//create a schema
// Pid, fhash, Tf, Kw, fec;

const docSchema = new mongoose.Schema({
  Pid: String,
  fhash: String,
  Tf: String,
  Kw: String,
  fec: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// create inverted index
docSchema.index({ Tf: 1, Kw: 1 });

//create a model
const Doc = mongoose.model("Doc", docSchema);

//export the model
module.exports = { connectDB, Doc };