import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import remixIconStyle from "remixicon/fonts/remixicon.css?url";
import stylesheet from "./app.css?url";
import { ThemeSwitcher } from "./components/themeSwitcher";
import CopyRight from "./components/copyRight";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./components/navigationBar";
import NotFoundPage from "./components/404";
import { commitSession, getSession } from "./sessions.server";
import { checkAuth } from "./utils/auth";

export const links = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Permanent+Marker&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "x-icon",
  },
  { rel: "stylesheet", href: remixIconStyle },
  { rel: "stylesheet", href: stylesheet },
];

export const meta = () => [
  {
    title: "default",
  },
  {
    name: "author",
    content: "redmaster academy",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
            <ScrollRestoration />
            <Scripts />
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth");

  const token = useLoaderData();

  return (
    <>
      {isAdminSubdomain || isAuthSubdomain ? null : (
        <NavigationBar token={token} />
      )}
      <Outlet />
      <ThemeSwitcher />
      <ToastContainer />
      {isAdminSubdomain || isAuthSubdomain ? null : <CopyRight />}
    </>
  );
}

// export function ErrorBoundary({ error }) {
//   console.log("🚀 ~ ErrorBoundary ~ error:", error)
//   let message = "Oops!";
//   let details = "An unexpected error occurred.";
//   let stack;

//   if (isRouteErrorResponse(error)) {
//     message = error.status === 404 ? "404" : "Error";
//     details =
//       error.status === 404
//         ? "The requested page could not be found."
//         : error.statusText || details;
//   } else if (import.meta.env.DEV && error && error instanceof Error) {
//     details = error.message;
//     stack = error.stack;
//   }

//   return (
//     <main className="pt-16 p-4 container mx-auto">
//       <h1>{message}</h1>
//       <p>{details}</p>
//       {stack && (
//         <pre className="w-full p-4 overflow-x-auto">
//           <code>{stack}</code>
//         </pre>
//       )}
//     </main>
//   );
// }

export function ErrorBoundary({ error }) {
  return <NotFoundPage error={error} />;
}

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const cookie = await commitSession(session);
  const result = session.get("token");
  return result;
}
