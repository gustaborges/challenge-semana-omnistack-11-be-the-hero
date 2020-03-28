const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection');


describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send(
            {
                name : "teste PEACE World BR",
                email : "contatopc@eace.com.br",
                whatsapp : "11999999999",
                city : "Ribeirão Preto",
                uf : "SP"
            }
        );
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    })
})