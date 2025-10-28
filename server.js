import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route mẫu
app.get("/", (req, res) => {
  res.send("🚀 Hello from Node.js server!");
});

app.get("/api/user", (req, res) => {
  res.json({ name: "Nguyễn Văn Khải", age: 24 });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running at http://0.0.0.0:${PORT}`);
});
