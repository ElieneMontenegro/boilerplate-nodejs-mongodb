import { dbHandler } from "../db-handler";
import UserService from "../../src/services/userService";
import { getFakeId, mockUser } from "./helpers";
import { NotFound } from "../../src/responseHandlers/errorHandlers";
import UserRepository from "../../src/repositories/userRepository";

const db = new dbHandler();

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await db.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await db.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await db.closeDatabase());

/**
 * Gets UserService to execute and test its functions
 */
const userService = new UserService();
const userRepo = new UserRepository();

/**
 * user test suite.
 */
describe("Create user ", () => {
  it("should be created correctly", async () => {
    const user = mockUser({ name: "lila montenegro" });

    const result = await userService.createUser(user);

    expect(result.name).toBe(user.name);
  });
});

describe("Get users ", () => {
  it("should get a user by id", async () => {
    const id = await userRepo.create(mockUser({ name: "lila montenegro" }));

    const result = await userService.getById(id);

    expect(result.name).toBe("lila montenegro");
    expect(result.email).toContain("lilamontenegro");
  });

  it("shouldn't find a user by id if it doesnt exist", async () => {
    const errorPromise = userService.getById(getFakeId());

    await expect(errorPromise).rejects.toBeInstanceOf(NotFound);
    await expect(errorPromise).rejects.toThrow("User not found");
  });

  it("should get a user by email", async () => {
    const user = mockUser({ name: "Silvio Santos" });

    const id = await userRepo.create(user);

    const userCreated = await userService.getById(id);

    const result = await userService.getByEmail(userCreated.email);

    expect(result.email).toBe(user.email);
  });

  it("shouldn't find a user by email if it doesnt exist in db", async () => {
    const email = "email.inexistente@algumacoisa.com";

    const errorPromise = userService.getByEmail(email);

    await expect(errorPromise).rejects.toBeInstanceOf(NotFound);
    await expect(errorPromise).rejects.toThrow("User not found");
  });

  it("should get all users", async () => {
    await userRepo.create(mockUser({ name: "ana beatriz" }));
    await userRepo.create(mockUser({ name: "lila montenegro" }));
    await userRepo.create(mockUser({ name: "joao pedro" }));

    const result = await userRepo.getAll();

    expect(result.length).toBe(3);
    expect(result[2].name).toBe("joao pedro");
  });
});

describe("Update user ", () => {
  it("should update a user by id", async () => {
    const user = mockUser({ name: "Jô Soares" });
    const id = await userRepo.create(user);

    await userService.updateById(id, {
      name: "Virgínia",
    });

    const result = await userService.getById(id);

    expect(result._id).toStrictEqual(id);
    expect(result.name).not.toBe(user.name);
  });

  it("shouldn't update a user that wasnt previously in db", async () => {
    const errorPromise = userService.updateById(getFakeId(), {
      name: "Vírginia",
    });

    await expect(errorPromise).rejects.toBeInstanceOf(NotFound);
    await expect(errorPromise).rejects.toThrow(`User not found`);
  });
});

describe("Delete user", () => {
  it("should delete a user successfully", async () => {
    const user = mockUser({ name: "jade" });
    const id = await userRepo.create(user);

    await userService.deleteById(id);

    const errorPromise = userService.getById(id);

    await expect(errorPromise).rejects.toBeInstanceOf(NotFound);
    await expect(errorPromise).rejects.toThrow(`User not found`);
  });

  it("should not delete a user", async () => {
    const errorPromise = userService.deleteById(getFakeId());

    await expect(errorPromise).rejects.toBeInstanceOf(NotFound);
    await expect(errorPromise).rejects.toThrow(`User not found`);
  });
});
