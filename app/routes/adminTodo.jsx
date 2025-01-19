import { Outlet } from "react-router";

export default function AdminTodoPage() {
  return (
    <div className="w-full h-full grid grid-cols-2 ">
      <div className=" w-full flex items-center justify-center bg-green-100">
        <h1>Admin Todo page</h1>
      </div>
      <Outlet />
    </div>
  );
}

