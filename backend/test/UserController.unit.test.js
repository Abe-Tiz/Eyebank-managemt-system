// const User = require("../model/User");
const { loginUser }= require("../controller/UserController");
const User = require("../models/User");
const Bcrypt = require('bcrypt');

describe("User Login", () => {

    // test for user found or not
  it("Should throw an error if the user is not found", async () => {
    // Mock findOne to simulate user not found
    User.findOne = jest.fn().mockReturnValueOnce(null);

    // Create a mock request object with email and password
    const req = {
      body: {
        email: "abebetizazu157@gmail.com",
        password: "12345678",
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Assert that loginUser function responds with 404 status
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User is not found." });
  });

    // test for user account deactivated 
  it("Should throw an error if the user account is deactivated", async () => {
    // Mock findOne to simulate finding a deactivated user
    User.findOne = jest.fn().mockReturnValueOnce({
      email: "abebetizazu157@gmail.com",
      isActive: false,
    });

    // Create a mock request object with email and password
    const req = {
      body: {
        email: "abebetiazu157@gmail.com",
        password: "12345678",
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Assert that loginUser function responds with 403 status
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Your account is deactivated. Please contact Admin to activate.",
    });
  });
});
