const port = process.env.PORT;
export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "RedMaster Academy",
      description:
        "<h2>Ali Shahbaz</h2>Api for course react router dom v6.4 created with Bun and Express and MongoDB",
      contact: {
        name: "redmaster.academy",
        email: "mr.redmasterr@gmail.com",
        url: "https://redmaster.academy/",
      },
    },
    tags: [
      {
        name: "Users",
        description: "APIs related to user management",
      },
      {
        name: "Todos",
        description: "APIs related to Todos management",
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    //   components: {
    //     securitySchemes: {
    //       bearerAuth: {
    //         type: "http",
    //         scheme: "bearer",
    //         bearerFormat: "JWT",
    //       },
    //     },
    //   },
    //   security: [
    //     {
    //       bearerAuth: [],
    //     },
    //   ],
  },
  apis: ["./routes/**/*.js"],
};
