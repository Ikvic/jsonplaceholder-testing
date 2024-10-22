const request = require('supertest');

const API_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API', () => {
    // Тест для получения списка постов
    test('should return a list of posts', async () => {
        const response = await request(API_URL).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Тест для получения конкретного поста
    test('should return a specific post', async () => {
        const response = await request(API_URL).get('/posts/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBeDefined();
    });

    // Тест для проверки 404 для несуществующего поста
    test('should return a 404 for non-existing post', async () => {
        const response = await request(API_URL).get('/posts/999');
        expect(response.statusCode).toBe(404);
    });

    let postId; // Переменная для хранения ID созданного поста

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
});
