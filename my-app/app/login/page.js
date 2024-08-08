"use client";

import { useState } from "react";
import { Card, Input, Button, Typography } from "../../material_tailwind";
import Link from "next/link";
import { login, signInWithGoogle } from "../lib/auth";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await login(email, password);
      setSuccess("User logged in successfully!");
      setEmail("");
      setPassword("");
      router.push("/");
      window.location.reload(true);
    } catch (error) {
      console.error("Error logging in with email and password: ", error);
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signInWithGoogle();
      setSuccess("User logged in successfully!");
      router.push("/"); // Redirect to the dashboard or another protected route
    } catch (error) {
      console.error("Error logging in with Google: ", error);
      setError("Failed to log in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card color="transparent" shadow={false} className="flex justify-center">
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to log in.
        </Typography>
        <form
          onSubmit={handleLogin}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          {error && (
            <Typography className="text-red-300 text-center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography className="text-green-300 text-center">
              {success}
            </Typography>
          )}
          <Typography
            variant="h6"
            color="blue-gray"
            className="my-4 text-center"
          >
            Or
          </Typography>
          <Button
            onClick={handleGoogleLogin}
            className="mt-6 bg-transparent border-2 border-black text-black"
            fullWidth
          >
            Log In with Google
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link href={"/signup"} className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;
