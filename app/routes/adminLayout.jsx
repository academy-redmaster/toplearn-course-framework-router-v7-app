import { Button } from "@heroui/button";
import { Link, Outlet } from "react-router";
export default function AdminLayoutPage() {
  return (
    <div className="w-full min-h-screen grid grid-cols-3">
      <div className="w-full h-full bg-slate-300 flex flex-col items-center justify-center gap-4">
        <h1>Admin Layout Page</h1>
        <Button as={Link} to="/" variant="shadow" color="secondary">
          Back Home
        </Button>
      </div>
      <div className="col-span-2">
        <Outlet />
      </div>
    </div>
  );
}


export function ErrorBoundary() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={notFoundImage} />
    </div>
  );
}