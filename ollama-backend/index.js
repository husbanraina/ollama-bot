// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/chat", async (req, res) => {
 
//   const { message } = req.body;

//   try {
//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "deepseek-llm",
//       prompt: message,
//       stream: false,
//     });

//     res.json({ response: response.data.response });
//   } catch (error) {
//     res.status(500).json({ error: "Error communicating with LLM" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { history } = req.body;
 // console.log(history.map(msg => `${msg.sender}: ${msg.text}`).join("\n") + "\nBot:")

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-llm",
      prompt: history.map(msg => `${msg.sender}: ${msg.text}`).join("\n") + "\nBot:",
      stream: false
    });

    res.json({ response: response.data.response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
