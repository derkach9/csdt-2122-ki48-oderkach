const request = require("supertest");
const app = require("../../app");

describe("User", () => {
  test("GetUsers", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
  test("PostUsers", () => {
    return request(app)
      .post("/")
      .expect(200);
  });
  test("PutUsers", () => {
    return request(app)
      .put("/")
      .expect(200);
  });
  test("DeleteUsers", () => {
    return request(app)
      .delete("/")
      .expect(200);
  });
  test("GetUserById", (id) => {
    return request(app)
      .get("/:id")
      .expect(200);
  });
});