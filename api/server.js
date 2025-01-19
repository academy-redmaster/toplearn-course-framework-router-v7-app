import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { dbConnect } from "./config/dbConnect";
import logger from "morgan";
import { userRoutes } from "./routes/users";
import { errorHandler, notFoundHandler } from "./middleware/error/indexx";
import { swaggerOptions } from "./utils/swaggerOption";
import { todoRoutes } from "./routes/todos";
import cors from "cors"

// port server: environment variables
const port = process.env.PORT || 3000;

// Swagger documentation setup
const app = express();

app.use(cors());

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// database connection
dbConnect();

// middleware
app.use(express.json());
 // logging middleware for development environment (optional)
app.use(logger("dev"));

// routes application
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/api-docs`);
});
