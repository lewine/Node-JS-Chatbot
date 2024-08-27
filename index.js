import express from 'express';
import ejs from 'ejs';
import colors from 'colors';
import openai from './config/open-ai.js';

var app = express();

app.use(express.static('public'));
app.use(express.json()); 
app.set('view engine', 'ejs');

app.listen(8080, () => {
    console.log(colors.bold.green('Server is running on http://localhost:8080'));
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

//Store conversation history
const chatHistory = [];

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        //construct messages by iterating over the history
        const messages = chatHistory.map(([role, content]) => ({ role, content }));

        //Add latest user input
        messages.push({ role: 'user', content: userMessage });

        //call the api with user input
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        //Get response
        const completionText = completion.choices[0].message.content;

        //update history with user input and assistant response
        chatHistory.push(['user', userMessage]);
        chatHistory.push(['assistant', completionText]);

        //Send the AI response to the frontend
        res.json({ response: completionText });

    } catch (error) {
        console.error(colors.red(error));
        res.status(500).json({ error: 'Failed to communicate with OpenAI' });
    }
});
