import { Button } from "@heroui/button";
import imageUrl from "../assets/image/404.svg";
import imageServerUrl from "../assets/image/500.svg";
import { isRouteErrorResponse, useNavigate } from "react-router";

export default function NotFoundPage({ error }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">
      {isRouteErrorResponse(error) ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
          <img
            src={error.status === 404 ? imageUrl : imageServerUrl}
            className="w-1/3 object-contain"
            alt=""
          />
          <h1 className="text-4xl font-bold">
            {error.status}: {error.data}
          </h1>
          <p className="text-foreground">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button
            onClick={() =>
              navigate("/", { replace: true, state: { name: "ali" } })
            }
            size="lg"
            color="danger"
            variant="shadow"
          >
            Go Back Home
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">
            {error.toString() || "OOps , Error "}
          </h1>
          <Button
            onClick={() =>
              navigate("/", { replace: true, state: { name: "ali" } })
            }
            size="lg"
            color="danger"
            variant="shadow"
          >
            Go Back Home
          </Button>
        </div>
      )}
    </div>
  );
}