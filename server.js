const express = require('express');
const bodyParser = require('body-parser');
const ChatBot = require('./ChatBot'); // Adjust the path accordingly
const app = express();
const port = 80;

app.use(bodyParser.json()); // Parse JSON request bodies

const chatBot = new ChatBot();

app.post('/api/train', async (req, res) => {
	const input = req.body.input;
	const output = req.body.output;
	res.json({ message: 'Training data will be added!' });
	chatBot.addToTrainingData(input, output);
});

app.get('/api/ask', async (req, res) => {
	const question = req.query.question;
	const answer = await chatBot.askBrain(question);
	res.json({ answer: answer });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});