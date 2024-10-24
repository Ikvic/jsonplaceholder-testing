const request = require('supertest');

const API_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API', () => {
    // получение списка 
    test('should return a list of posts', async () => {
        const response = await request(API_URL).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // получение одного конкретного
    test('should return a specific post', async () => {
        const response = await request(API_URL).get('/posts/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBeDefined();
    });

    // Тест для проверки 404
    test('should return a 404 for non-existing post', async () => {
        const response = await request(API_URL).get('/posts/999');
        expect(response.statusCode).toBe(404);
    });

    let postId; // Переменная для хранения ID которого создал

    // Тест для создания нового поста (POST)
    test('should create a new post', async () => {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1,
        };

        const response = await request(API_URL)
            .post('/posts')
            .send(newPost);

        expect(response.statusCode).toBe(201); // Успешное создание возвращает 201
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.body).toBe(newPost.body);
        expect(response.body.userId).toBe(newPost.userId);

        postId = response.body.id; // Сохраняем ID 
    });
    //обнова поста
    test('should update a post', async () => {
        const updatedPost = {
            title: 'foo updated',
        };

        const response = await request(API_URL)
            .put(`/posts/1`) // Используй конкретный ID поста
            .send(updatedPost);

        console.log('Response status code:', response.statusCode);
        console.log('Response body:', response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedPost.title);
    });

    // Тест для удаления поста (DELETE)
    test('should delete a post', async () => {
        const response = await request(API_URL)
            .delete(`/posts/${postId}`);

        expect(response.statusCode).toBe(200); // Успешное удаление возвращает 200

        // Проверяем, что удаленный пост больше не существует
        const getResponse = await request(API_URL).get(`/posts/${postId}`);
        expect(getResponse.statusCode).toBe(404); // Не найдено возвращает 404 Найс Найс
    });

    // тест для проверки 401 
    test('should return a 401 error for unauthorized request', async () => {
        const response = await request('http://httpstat.us').get('/401');
        expect(response.statusCode).toBe(401);
    });

    // Тест проверки 403 
    test('should return a 403 error for forbidden access', async () => {
        const response = await request('http://httpstat.us').get('/403');
        expect(response.statusCode).toBe(403);
    });

    // Тест для проверки 429 
    test('should return a 429 error for too many requests', async () => {
        const response = await request('http://httpstat.us').get('/429');
        expect(response.statusCode).toBe(429);
    });

});
