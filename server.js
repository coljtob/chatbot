const express = require('express');
const bodyParser = require('body-parser');
const ChatBot = require('./ChatBot'); 
const app = express();
const port = 3001;

const chatBot = new ChatBot();

app.use(bodyParser.json());

app.post('/api/train', async (req, res) => {
	const input = req.body.input;
	const output = req.body.output;
	if (input == undefined || output == undefined) {
		res.json({ message: 'Training data not added, but re-training!' });
	} else {
		res.json({ message: 'Training data will be added!' });
	}
	
	chatBot.addToTrainingData(input, output);
});

app.get('/api/ask', async (req, res) => {
	const question = req.query.question;
	const answer = await chatBot.askBrain(question);
	res.json({ answer: answer });
});

const server = app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

server.timeout = 120000;

module.exports = app; 