   import * as mongoose from 'mongoose';

   // Todo Schema
   const todoSchema = new mongoose.Schema(
      {
         title: {
            type: String,
            required: [ true, 'Title is required' ],
            trim: true
         },
         description: {
            type: String,
            trim: true
         },
         status: {
            type: String,
            enum: [ 'pending', 'in_progress', 'completed', 'archived' ],
            default: 'pending'
         },
         dueDate: {
            type: Date
         },
         priority: {
            type: String,
            enum: [ 'low', 'medium', 'high' ],
            default: 'medium'
         },
         completedAt: {
            type: Date
         },
         owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
         },
         isArchived: {
            type: Boolean,
            default: false
         },
         isCompleted: {
            type: Boolean,
            default: false
         },
         tags: [
            {
               type: String,
               trim: true
            }
         ]
      },
      {
         toJSON: { virtuals: true },
         toObject: { virtuals: true },
         timestamps: true
      }
   );

   // Middleware to set completedAt date if status is changed to completed
   todoSchema.pre('save', function (next) {
      if (this.isModified('status') && this.status === 'completed') {
         this.completedAt = new Date();
      } else if (this.isModified('status') && this.status !== 'completed') {
         this.completedAt = null;
      }
      next();
   });

   // Virtual to calculate the remaining days until the due date
   todoSchema.virtual('daysLeft').get(function () {
      if (this.dueDate) {
         const now = new Date();
         const timeDiff = this.dueDate.getTime() - now.getTime();
         return Math.ceil(timeDiff / (1000 * 3600 * 24));
      }
      return null;
   });

   // Method to mark a todo as archived
   todoSchema.methods.archive = function () {
      this.isArchived = true;
      return this.save();
   };

   // Method to unarchive a todo
   todoSchema.methods.unarchive = function () {
      this.isArchived = false;
      return this.save();
   };

   // Method to check if the todo is overdue
   todoSchema.methods.isOverdue = function () {
      return this.dueDate && this.dueDate < new Date();
   };

   export const Todo = mongoose.model('Todo', todoSchema);
