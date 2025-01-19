import express from 'express';
import {
   archiveTodoController,
   createTodoController,
   deleteTodoController,
   fetchTodosController,
   fetchTodosDelayController,
   getTodoDetailsController,
   markTodoAsCompletedController,
   unarchiveTodoController,
   updateTodoController
} from '../../controller/todos';

export const todoRoutes = express.Router();

// !----------------------------------------------------------------
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Fetch all todos
 *     description: Fetches all todos with their status, which can be 'pending', 'in_progress', 'completed', or 'archived'.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Returns a list of todos
 */

todoRoutes.get('/', fetchTodosController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /delay-todos:
 *   get:
 *     summary: Fetch todos with a 10-second delay
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *       500:
 *         description: Server error
 */

todoRoutes.get('/delay-todos', fetchTodosDelayController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo successfully created
 *       400:
 *         description: Invalid input data
 */
todoRoutes.post('/', createTodoController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Fetch todo details by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Returns todo details
 *       404:
 *         description: Todo not found
 */
todoRoutes.get('/:id', getTodoDetailsController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}/:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed, archived]
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Todo successfully updated
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Todo not found
 */
todoRoutes.put('/:id', updateTodoController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}/complete:
 *   patch:
 *     summary: Mark a todo as completed
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo marked as completed
 *       404:
 *         description: Todo not found
 */
todoRoutes.patch('/:id/complete', markTodoAsCompletedController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}/archive:
 *   patch:
 *     summary: Archive a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo successfully archived
 *       404:
 *         description: Todo not found
 */
todoRoutes.patch('/:id/archive', archiveTodoController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}/unarchive:
 *   patch:
 *     summary: Unarchive a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo successfully unarchived
 *       404:
 *         description: Todo not found
 */
todoRoutes.patch('/:id/unarchive', unarchiveTodoController);
// !----------------------------------------------------------------
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo successfully deleted
 *       404:
 *         description: Todo not found
 */
todoRoutes.delete('/:id', deleteTodoController);
// !----------------------------------------------------------------
