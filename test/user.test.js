const supertest = require("supertest");
const { app } = require("../src/app/app.js");
const { prismaClient } = require("../src/app/database.js");

describe('POST api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                email: "test@mail.com"
            }
        });
    })

    it('Should register new user', async () => {
        const result = await supertest(app)
            .post('/api/users')
            .send({
                email: "test@mail.com",
                password: "123456",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("test@mail.com");
        expect(result.body.data.password).toBeUndefined();
    })
});