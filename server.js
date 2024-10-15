// server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import {
  fileURLToPath
} from "url";

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/api/search", async (req, res) => {
  try {
    const {
      searchType,
      keyword
    } = req.query;
    let apiUrl;

    if (searchType === "mahasiswa") {
      apiUrl = `https://api-frontend.kemdikbud.go.id/hit_mhs/${encodeURIComponent(keyword)}`;
    } else {
      apiUrl = `https://api-frontend.kemdikbud.go.id/hit/${encodeURIComponent(keyword)}`;
    }

    console.log("Fetching from:", apiUrl);

    const response = await axios.get(apiUrl);
    res.setHeader("Content-Type", "application/json");
    res.json(response.data);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist", "index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));