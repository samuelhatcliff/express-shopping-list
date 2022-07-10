process.env.NODE_ENV = "test";


const request = require("supertest")
//getting error: Cannot find module 'supertest' from 'test.js'

const app = require("./app")
const items = require("./fakeDb.js")

let snickers = { name: "snickers", price: 1.99 }

beforeEach(function () {
    items.push(snickers);
})

afterEach(function () {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [snickers] })
    })
})

describe("GET /items/:name", () => {
    test("Get single item by name", async () => {
        const res = await request(app).get(`/items/${snickers.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(snickers)
    })

    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).get(`/items/pepsi`)
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", () => {
    test("Creating an item", async () => {
        const gummies = { name: "gummies", price: 0.50 }
        const res = await request(app).post("/items").send(gummies)
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ "added": gummies })
    })

    test("Responds with 404 if name is missing", async () => {
        const res = await request(app).post(`/items`).send({})
        expect(res.statusCode).toBe(404);
    })
})

describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        // const gummies = { name: "gummies", price: 0.50 }
        const res = await request(app).patch(`/items/${snickers.name}`).send({ name: "take5" })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "updated": { "name": "take5", "price": 1.99 } })
    })

    test("Responds with 404 for invalid name", async () => {
        const res = await (await request(app).patch(`/items/pepsi`)).send({ name: "coke" });
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("Updates a single item", async () => {
        // const gummies = { name: "gummies", price: 0.50 }
        const res = await request(app).delete(`/items/${snickers.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" })
    })

    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).delete(`/items/pepsi`);
        expect(res.statusCode).toBe(404);
    })
})