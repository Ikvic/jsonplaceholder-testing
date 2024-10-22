const request = require('supertest');

const API_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API', () => {
    test('should return a list of posts', async () => {
        const response = await request(API_URL).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return a specific post', async () => {
        const response = await request(API_URL).get('/posts/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBeDefined();
    });

    test('should return a 404 for non-existing post', async () => {
        const response = await request(API_URL).get('/posts/999');
        expect(response.statusCode).toBe(404);
    });
});
