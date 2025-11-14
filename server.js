import express from "express";
import cors from "cors";

import { httpRequest } from "laziness-axios";

const app = express();
const PORT = process.env.PORT || 3000;

const instance = httpRequest({
  config: {
    baseURL: "https://jsonplaceholder.typicode.com",
    authType: "none",
    headers_parameters: {
      apiKey: "1234567",
    },
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Route mẫu
app.get("/", (req, res) => {
  res.send(`🚀 Hello from Node.js server! PORT: ${PORT}`);
});

app.get("/api/user", async (req, res) => {
  instance.defaults.headers["x-user-key"] = "123456";
  const response = await instance.get("/posts/1", {});

  console.log("response123123123", instance);
  res.json(response);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running at http://0.0.0.0:${PORT}`);
});
