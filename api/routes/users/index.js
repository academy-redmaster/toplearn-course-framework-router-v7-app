import express from "express";
import {
  deleteUsersController,
  detailsUserController,
  fetchUsersController,
  loginUserController,
  RegisterUsersController,
} from "../../controller/users";

export const userRoutes = express.Router();

// !----------------------------------------------------------------
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Fetch all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of users
 */
userRoutes.get("/", fetchUsersController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: User already exists
 */
userRoutes.post("/register", RegisterUsersController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user and generate token
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns user data and token
 *       400:
 *         description: Invalid email or password
 */
userRoutes.post("/login", loginUserController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
userRoutes.delete("/:id", deleteUsersController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetch user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Returns user details
 *       404:
 *         description: User not found
 */
userRoutes.get("/:id", detailsUserController);
// !----------------------------------------------------------------
