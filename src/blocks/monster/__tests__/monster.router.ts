/**
 * Tests monster.router.ts
 * 
 * @group integration
 */
import request from "supertest";
import db from '../../../db/db';
import { app } from '../../../../app';

const path = '/api/block';

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
})

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get(path + '/');
    // expect(result.text).toEqual("hello");
    expect(result.statusCode).toEqual(200);
  });
});