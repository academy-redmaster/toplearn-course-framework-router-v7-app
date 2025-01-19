import notFoundImage from "../assets/image/fire.gif";

export default function AdminTodoDetailsPage() {
  return (
    <div>
      <div className="flex items-center justify-center h-full w-full bg-red-200">
        <h1>Admin Todo Details page</h1>
      </div>
    </div>
  );
}
export async function loader() {
  throw new Response("error", { status: 404 });
  return null;
}


export function ErrorBoundary() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={notFoundImage} />
    </div>
  );
}