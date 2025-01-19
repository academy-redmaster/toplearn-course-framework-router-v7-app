import { Todo } from '../../model/todos';
import { validationID } from '../../utils/validationID';

// !----------------------------------------------------------------
export const fetchTodosController = async (req, res) => {
   try {
      const { priority, status } = req.query;
      const query = {};
      if (priority) {
         query.priority = priority;
      }
      if (status) {
         query.status = status;
      }
      const todos = await Todo.find(query).populate('owner');
      res.json(todos);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const fetchTodosDelayController = async (req, res) => {
   try {
      await Bun.sleep(10000);

      const todos = await Todo.find({}).populate('owner');
      res.json(todos);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// !----------------------------------------------------------------
export const createTodoController = async (req, res) => {
   try {
      const todo = await Todo.create({
         ...req.body
      });

      res.status(201).json(todo);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const getTodoDetailsController = async (req, res) => {
   const { id } = req.params;
   validationID(id);
   try {
      const todo = await Todo.findById(id).populate('owner');
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const updateTodoController = async (req, res) => {
   const { id } = req.params;
   const updates = req.body;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// !----------------------------------------------------------------
export const markTodoAsCompletedController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(
         id,
         { status: 'completed', isCompleted: true, completedAt: new Date() },
         { new: true, runValidators: true }
      );
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const archiveTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);
   const todo = await Todo.findById(id);

   if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
   }

   const status = todo.isCompleted;
   try {
      const updatedTodo = await Todo.findByIdAndUpdate(
         id,
         { status: 'archived', isArchived: true, isCompleted: status },
         { new: true }
      );
      if (!updatedTodo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(updatedTodo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const unarchiveTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findById(id);
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      const status = todo.isCompleted ? 'completed' : 'pending';
      const updatedTodo = await Todo.findByIdAndUpdate(
         id,
         {
            status,
            isArchived: false,
            isCompleted: true
         },
         { new: true }
      );
      res.json(updatedTodo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// !----------------------------------------------------------------
export const deleteTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo successfully deleted' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
