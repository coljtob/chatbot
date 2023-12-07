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
		this.backUpFile("training/trained-net.json");
		this.backUpFile("training/training-data-array.json");

		let fileContentJSON;
		let fileContent;
		let uniqueFileContentJSON;
		if (this.doesFileExist("training/training-data-array.json")) {
			
			fileContent = fs.readFileSync("training/training-data-array.json", "utf8");
			console.log("length of file conent: " + fileContent.length);
			console.log("file content: " + fileContent);
			fileContentJSON = JSON.parse(fileContent);

			if (input == undefined && output == undefined) {
				// retrain on api/train with no input/output (in case of adjusting threshold, iterations, etc.)
				console.log('Retraining brain with existing data');
			} else {
				// adding new data to training data
				fileContentJSON.push({ input: input, output: output });
			}
		} else {
			// first time training
			fileContentJSON = this.trainingData;
			fileContentJSON.push({ input: input, output: output });
		}
		// remove chance of duplicates, especially running tests more than once
		uniqueFileContentJSON = this.removeDuplicates(fileContentJSON, "output");
		const jsonData = JSON.stringify(uniqueFileContentJSON, null, 2);
		try {
			fs.writeFileSync('training/training-data-array.json', jsonData, 'utf8');
			console.log('JSON training data written to file successfully.');
		} catch (err) {
			console.error('Error writing to file:', err);
		}

		this.trainBrain(uniqueFileContentJSON);
	}

	removeDuplicates = (array, key) => {
		const seen = new Set();
		return array.filter((item) => {
			const itemKey = item[key];
			return seen.has(itemKey) ? false : seen.add(itemKey);
		});
	};

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
		let fileContent = fs.readFileSync("training/trained-net.json", "utf8");
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
			errorThresh: 0.0110,
			iterations: 3000,
			log: true
		});

		const json = net.toJSON();
		const jsonData = JSON.stringify(json, null, 2);

		try {
			fs.writeFileSync('training/trained-net.json', jsonData, 'utf8');
			console.log('JSON training net written to file successfully.');
		} catch (err) {
			console.error('Error writing to file:', err);
		}
	}
	
}

module.exports = ChatBot;