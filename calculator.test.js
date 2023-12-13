const request = require("supertest");
const app = require("./calculator");

describe("GET /mean", () => {
  test("calculates mean of numbers", async () => {
    const response = await request(app).get("/mean?nums=1,2,3,4,5");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mean", value: 3 });
  });

  test("returns error if nums parameter is missing", async () => {
    const response = await request(app).get("/mean");
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toEqual("nums are required");
  });
});

describe("GET /median", () => {
  test("calculates median of numbers", async () => {
    const response = await request(app).get("/median?nums=1,2,3,4,5");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "median", value: 3 });
  });

  test("returns error if nums parameter is missing", async () => {
    const response = await request(app).get("/median");
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toEqual("nums are required");
  });
});

describe("GET /mode", () => {
  test("calculates mode of numbers", async () => {
    const response = await request(app).get("/mode?nums=1,2,2,3,4");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mode", value: 2 });
  });

  test("returns error if nums parameter is missing", async () => {
    const response = await request(app).get("/mode");
    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toEqual("nums are required");
  });
});
