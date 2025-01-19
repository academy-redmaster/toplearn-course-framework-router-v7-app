import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("routes/protectedRoute.jsx", [
    route("/contactus", "routes/contactUs.jsx"),
    route("todo", "routes/todoLayout.jsx", [
      index("routes/todoIndex.jsx"),
      route("create", "routes/todoCreate.jsx", { id: "todo-create" }),
      route(":id", "routes/todoDetails.jsx"),
      route(":id/edit", "routes/todoCreate.jsx" ,{ id: "todo-edit" }),
    ]),
    route("admin", "routes/adminLayout.jsx", [
      route("/admin", "routes/adminIndex.jsx", [
        route("/admin/", "routes/adminTodo.jsx", [
          route("/admin/index", "routes/adminTodoDetails.jsx"),
        ]),
      ]),
    ]),
  ]),
  route("/:lang?/", "routes/home.jsx"),
  ...prefix("auth", [
    route("login", "routes/login.jsx"),
    route("signup", "routes/signUp.jsx"),
  ]),
];
