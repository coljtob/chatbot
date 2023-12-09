const chai = require('chai');
const supertest = require('supertest');
const app = require('../server.js'); // Import your Express app

const expect = chai.expect;
const api = supertest(app);

describe('API Tests', () => {
	const questions = ['copy file into docker container','favorite city','favorite cloud','favorite food','favorite rock','favorite state','how to clean node cache','how to rebase in git','how to run nodejs file on command line','how to view all ports being used on mac','What is the meaning of life?','favorite company to work for'];
	const answers = ['docker cp ./some_file CONTAINER:/work','boston','stratus','pizza','igneous','mass','npm cache clean --force','git pull origin --rebase','node --experimental-modules src/file.js','sudo lsof -iTCP -sTCP:LISTEN -n -P','Appreciate every day','Adobe'];
	
	// already trained answer
	it('question 1: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[0])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[0]);
	});

	// already trained answer
	it('question 2: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[1])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[1]);
	});

	// already trained answer
	it('question 3: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[2])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[2]);
	});

	// already trained answer
	it('question 4: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[3])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[3]);
	});

	// already trained answer
	it('question 5: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[4])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[4]);
	});

	// already trained answer
	it('question 6: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[5])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[5]);
	});

	// already trained answer
	it('question 7: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[6])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[6]);
	});

	// already trained answer
	it('question 8: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[7])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[7]);
	});

	// already trained answer
	it('question 9: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[8])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[8]);
	});

	// already trained answer
	it('question 10: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[9])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[9]);
	});

	// already trained answer
	it('question 11: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[10])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[10]);
	});

	// train new answer
	it('train 1: should handle a POST request with the correct data', async () => {
		const postData = { input: questions[11], output: answers[11] };
		const response = await api.post('/api/train').send(postData);
		expect(response.status).to.equal(200);
	});

		// new answer
	it('train 2: should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[11])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[11]);
	});
	
});

