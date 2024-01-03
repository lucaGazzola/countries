const request = require('supertest');
const server = require('./server');

describe('/getForCountry endpoint', () => {
  it('should respond with 200 for valid country code', async () => {
    const response = await request(server).get('/getForCountry?country=US');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 400 for invalid country code', async () => {
    const response = await request(server).get('/getForCountry?country=INVALID');
    expect(response.statusCode).toBe(400);
  });

  it('should respond with 400 for missing country code', async () => {
    const response = await request(server).get('/getForCountry');
    expect(response.statusCode).toBe(400);
  });

  afterAll(done => {
    server.close(done); // Close the server after running the tests
  });
});