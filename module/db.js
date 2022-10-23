const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://omar:omar1234@test.jyc6ghz.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connect to mongodb sucses");
  })
  .catch((err) => {
    console.log(`Errore: ${err}`);
  });
let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  dataTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("use", userSchema);
