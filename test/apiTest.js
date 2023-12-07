const chai = require('chai');
const supertest = require('supertest');
const app = require('../server.js'); // Import your Express app

const expect = chai.expect;
const api = supertest(app);

describe('API Tests', () => {
	const questions = ['What is the meaning of life?', 'how to clean node cache', 'favorite company to work for'];
	const answers = ['Appreciate every day', 'npm cache clean --force', 'Adobe'];

	// already trained answer
	it('should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[0])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[0]);
	});

	// already trained answer
	it('should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[1])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[1]);
	});

	// train new answer
	it('should handle a POST request with the correct data', async () => {
		const postData = { input: questions[2], output: answers[2] };
		const response = await api.post('/api/train').send(postData);
		expect(response.status).to.equal(200);
	});

	// new answer
	it('should return a 200 status code for a GET request with correct answer', async () => {
		const response = await api.get(`/api/ask?question=${encodeURIComponent(questions[2])}`);
		expect(response.status).to.equal(200);
		expect(response.body.answer).to.equal(answers[2]);
	});
	
});

