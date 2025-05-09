const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include all methods you use
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Microservices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const AuthData = mongoose.connection.collection("AuthData");
//
// const ActualData = new mongoose.model("AuthData", authDataSchema, "AuthData");

app.put("/details/:id", async (req, res) => {
  const { id } = req.params;
  const detailsData = req.body;
  try {
    const objectId = new mongoose.Types.ObjectId(id.toString());
    const result = await AuthData.updateOne(
      { _id: objectId },
      { $set: { details: detailsData } } // 👈 Creates if not exists
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "✅ Details added/updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/normal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await AuthData.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DalyEarning Route
app.put("/details/:id/dailyearning", async (req, res) => {
  const { id } = req.params;
  const newItem = req.body; // Expected to be an object or value to push

  try {
    const objectId = new mongoose.Types.ObjectId(id.toString());

    const result = await AuthData.updateOne(
      { _id: objectId },
      { $push: { "details.dailyearning": newItem } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "✅ New item added to dailearning!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/details/:id/dailyexpense", async (req, res) => {
  const { id } = req.params;
  const newItem = req.body; // Expected to be an object or value to push

  try {
    const objectId = new mongoose.Types.ObjectId(id.toString());

    const result = await AuthData.updateOne(
      { _id: objectId },
      { $push: { "details.dailyexpense": newItem } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "✅ New item added to dailearning!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("App listen on 5000 port"));
