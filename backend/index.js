// index.js
const express = require('express');
const { ChatOpenAI } = require('@langchain/openai');
require('dotenv').config();
var cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Create ChatOpenAI model instance with your API key
const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to summarize a paragraph
app.post('/summarize', async (req, res) => {
  try {
    const { paragraph } = req.body;

    // LangChain prompt to summarize the paragraph
    const summary = await chatModel.invoke(`Summarize the following paragraph: "${paragraph}"`);

    res.json({ summary: summary.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
