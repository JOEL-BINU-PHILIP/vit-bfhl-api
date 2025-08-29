const request = require('supertest');
const app = require('../server');

describe('BFHL API Tests', () => {

    describe('POST /bfhl', () => {
        test('Example A - Mixed data types', async () => {
            const testData = {
                data: ["a", "1", "334", "4", "R", "$"]
            };

            const response = await request(app)
                .post('/bfhl')
                .send(testData)
                .expect(200);

            expect(response.body.is_success).toBe(true);
            expect(response.body.odd_numbers).toEqual(["1"]);
            expect(response.body.even_numbers).toEqual(["334", "4"]);
            expect(response.body.alphabets).toEqual(["A", "R"]);
            expect(response.body.special_characters).toEqual(["$"]);
            expect(response.body.sum).toBe("339");
            expect(response.body.concat_string).toBe("Ra");
        });

        test('Example B - More complex data', async () => {
            const testData = {
                data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
            };

            const response = await request(app)
                .post('/bfhl')
                .send(testData)
                .expect(200);

            expect(response.body.is_success).toBe(true);
            expect(response.body.odd_numbers).toEqual(["5"]);
            expect(response.body.even_numbers).toEqual(["2", "4", "92"]);
            expect(response.body.alphabets).toEqual(["A", "Y", "B"]);
            expect(response.body.special_characters).toEqual(["&", "-", "*"]);
            expect(response.body.sum).toBe("103");
            expect(response.body.concat_string).toBe("ByA");
        });

        test('Example C - Only alphabetic strings', async () => {
            const testData = {
                data: ["A", "ABcD", "DOE"]
            };

            const response = await request(app)
                .post('/bfhl')
                .send(testData)
                .expect(200);

            expect(response.body.is_success).toBe(true);
            expect(response.body.odd_numbers).toEqual([]);
            expect(response.body.even_numbers).toEqual([]);
            expect(response.body.alphabets).toEqual(["A", "ABCD", "DOE"]);
            expect(response.body.special_characters).toEqual([]);
            expect(response.body.sum).toBe("0");
            expect(response.body.concat_string).toBe("EoDdCbAa");
        });

        test('Empty array', async () => {
            const testData = {
                data: []
            };

            const response = await request(app)
                .post('/bfhl')
                .send(testData)
                .expect(400);

            expect(response.body.is_success).toBe(false);
        });

        test('Invalid JSON', async () => {
            const response = await request(app)
                .post('/bfhl')
                .send('invalid json')
                .expect(400);

            expect(response.body.is_success).toBe(false);
        });

        test('Missing data field', async () => {
            const response = await request(app)
                .post('/bfhl')
                .send({})
                .expect(400);

            expect(response.body.is_success).toBe(false);
        });
    });

    describe('GET /bfhl', () => {
        test('Should return API status', async () => {
            const response = await request(app)
                .get('/bfhl')
                .expect(200);

            expect(response.body.operation_code).toBe(1);
            expect(response.body.is_success).toBe(true);
        });
    });

    describe('GET /health', () => {
        test('Should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body.status).toBe('OK');
            expect(response.body.timestamp).toBeDefined();
        });
    });
});