const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend API chal rahi hai", project: "backend" });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Salam! Ye response backend se aaya hai.",
    time: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Backend server: http://localhost:${PORT}`);
});
