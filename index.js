import express from 'express';
import ejs from 'ejs';
import colors from 'colors';
import openai from './config/open-ai.js';

var app = express();

app.use(express.static('public'));
app.use(express.json()); 
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/', function (req, res) {
    res.render('pages/index');
});

//Store conversation history
const chatHistory = [];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (typeof userMessage !== "string" || !userMessage.trim()) {
    return res.status(400).json({ error: "Invalid message content" });
  }

  try {
    const messages = chatHistory.map(({ role, content }) => ({ role, content }));
    messages.push({ role: "user", content: userMessage });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const completionText = completion.choices[0].message.content;

    chatHistory.push({ role: "user", content: userMessage });
    chatHistory.push({ role: "assistant", content: completionText });

    res.json({ response: completionText });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
});

