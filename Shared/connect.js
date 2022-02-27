const { MongoClient } = require("mongodb");

module.exports = {
  db: null,
  async connect() {
    try {
      var con = await MongoClient.connect("mongodb+srv://admin:admin123@cluster0.v9bkm.mongodb.net?retryWrites=true&w=majority");
      this.db = con.db("Tasksubmision");
      console.log("MongoDB Connected");
    } catch (err) {
      console.log("Not Connected");
    }
  },
};

