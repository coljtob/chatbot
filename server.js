const express = require('express');
const bodyParser = require('body-parser');
const ChatBot = require('./ChatBot'); // Adjust the path accordingly
const app = express();
const port = 3001;



const chatBot = new ChatBot();

/*const queue = [];
let inprogress = null;*/

app.use(bodyParser.json()); // Parse JSON request bodies
/*app.use((req, res, next) => {
	if (inprogress) {
		queue.push({req, res, next})
	} else {
		inprogress = res;
		next();
	}
})*/
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

/*app.use((req, res, next) => {
	inprogress = null;
	if (queue.length > 0) {
		const queued = queue.shift();
		inprogress = queued.res;
		queued.next();
	}
	next();
})*/

const server = app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

server.timeout = 120000;