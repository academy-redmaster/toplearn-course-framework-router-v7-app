import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import axios from "axios";
import { Form, Link, redirect, useNavigation } from "react-router";
import { toast } from "react-toastify";
import { commitSession, getSession } from "../sessions.server";

export default function LoginPage() {
  const navigation = useNavigation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back!
        </h2>
        <p className="text-center mb-6">
          Please login to your account to continue.
        </p>
        <Form method="POST" className="space-y-6">
          <div>
            <Input
              type="email"
              name="email"
              label="Email Address"
              variant="bordered"
              color="primary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              variant="bordered"
              color="primary"
              fullWidth
              isRequired
              errorMessage="Password is required"
            />
          </div>
          <Button
            fullWidth
            color="primary"
            variant="solid"
            size="lg"
            type="submit"
          >
            {navigation.state !== "idle" ? "submitting..." : "Login"}
          </Button>
        </Form>

        <p className="flex items-center justify-center gap-x-4 text-sm text-center text-black mt-6">
          Don`t have an account?
          <Link
            to="/auth/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

// export async function clientAction({ request }) {
//   const data = Object.fromEntries(await request.formData());
//   try {
//     const response = await axios.post(
//       "http://localhost:8008/api/users/login",
//       data
//     );

//     const token = response.data.token;

//     if (token) {
//       localStorage.setItem("authToken", token);
//       toast.success("login successfull");
//       return redirect("/");
//     }
//   } catch (error) {
//     if (!data.email || !data.password) {
//       toast.error("complete login form");
//       return redirect("/auth/signup");
//     }
//     console.log("🚀 ~ handleSubmit ~ error:", error);
//     throw new Response(`action login: ${error.message}`, { status: 404 });
//   }
// }

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());

  try {
    const response = await axios.post(
      "http://localhost:8008/api/users/login",
      data
    );

    const token = response.data.token;

    if (token) {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("token", token);
      const cookie = await commitSession(session);
      return redirect("/", {
        headers: {
          "Set-Cookie": cookie,
        },
      });
    }
  } catch (error) {
    if (!data.email || !data.password) {
      toast.error("complete login form");
      return redirect("/auth/signup");
    }
    console.log("🚀 ~ handleSubmit ~ error:", error);
    throw new Response(`action login: ${error.message}`, { status: 404 });
  }
}

export const meta = () => [
  {
    title: "Login Page",
  },
];
