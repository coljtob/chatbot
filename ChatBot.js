const fs = require('fs');
const readline = require('readline');
const brain = require('brain.js');

class ChatBot {
	constructor() {
		this.trainingData = [];
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
	}

	addToTrainingData(input, output) {
		this.backUpFile("trained-net.json");
		this.backUpFile("training-data-array.json");

		let fileContentJSON;
		let fileContent;

		if (this.doesFileExist("training-data-array.json")) {
			fileContent = fs.readFileSync("training-data-array.json", "utf8");
			fileContentJSON = JSON.parse(fileContent);

			if (input == undefined && output == undefined) {
				console.log('Retraining brain with existing data');
			} else {
				fileContentJSON.push({ input: input, output: output });
			}
		} else {
			fileContentJSON = this.trainingData;
			fileContentJSON.push({ input: input, output: output });
		}

		const jsonData = JSON.stringify(fileContentJSON, null, 2);
		fs.writeFile('training-data-array.json', jsonData, 'utf8', (err) => {
			if (err) {
				console.error('Error writing to file:', err);
			} else {
				console.log('JSON training data written to file successfully.');
			}
		});

		this.trainBrain(fileContentJSON);
	}

	askQuestion(question) {
		return new Promise((resolve) => {
			this.rl.question(question, (answer) => {
				resolve(answer);
			});
		});
	}

	doesFileExist(filePath) {
		try {
			if (fs.existsSync(filePath)) {
				return true;
			}
		} catch (err) {
			console.error(err);
		}
	}

	async askBrain(question) {
		let fileContent = fs.readFileSync("trained-net.json", "utf8");
		let fileContentJSON = JSON.parse(fileContent);
		const net = new brain.recurrent.LSTM();
		net.fromJSON(fileContentJSON);
		let answer = await net.run(question);
		return answer;
	}

	backUpFile(filePath) {
		if (this.doesFileExist(filePath)) {
			fs.copyFile(filePath, filePath + "_bak.json", (err) => {
				if (err) {
					console.error('Error backing up file:', err);
				} else {
					console.log('File backed up successfully.');
				}
			});
		}
	}

	trainBrain(dataSet) {
		const net = new brain.recurrent.LSTM();
		net.train(dataSet, {
			iterations: 10000,
			errorThresh: 0.0100,
			log: true
		});

		const json = net.toJSON();
		const jsonData = JSON.stringify(json, null, 2);

		fs.writeFile('trained-net.json', jsonData, 'utf8', (err) => {
			if (err) {
				console.error('Error writing to file:', err);
			} else {
				console.log('Data written to file successfully.');
				console.log('Thank you for your input');
			}
		});
		this.main();
	}

	async main() {
		// for running command line tests
		let train = await this.askQuestion('train, ask, or retrain? ');

		if (train === 'train') {
			const input = await this.askQuestion('What is the training question? ');
			const output = await this.askQuestion('What is the training answer? ');
			this.addToTrainingData(input, output);
		} else if (train === 'ask') {
			if (!this.doesFileExist("trained-net.json")) {
				const question = await this.askQuestion('Training is empty. Please choose train.');
			} else {
				const question = await this.askQuestion('What is your question? ');
				this.askBrain(question);
			}
		} else if (train === 'retrain') {
			this.addToTrainingData();
		} else {
			train = await this.askQuestion('Do not understand your request.');
		}

		this.rl.close();
	}
}

module.exports = ChatBot;