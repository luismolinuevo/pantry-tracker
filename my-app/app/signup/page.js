"use client";

import { useState } from "react";
import { Card, Input, Button, Typography } from "../../material_tailwind";
import Link from "next/link";
import { signInWithGoogle, signUp } from "../lib/auth";
import { useRouter } from "next/navigation";

export function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signUp(email, password);
      setSuccess("User signed up successfully!");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.error("Error signing up with email and password: ", error);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setSuccess(null);

    try {
      await signInWithGoogle();
      setSuccess("User signed up successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error signing up with email and password: ", error);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100%] bg-gray-50">
      <Card color="transparent" shadow={false} className="flex justify-center">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSignUp}
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
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          {error && <p className="text-red-300 text-center">{error}</p>}
          {success && <p className="text-green-300 text-center">{success}</p>}
          <Typography
            variant="h6"
            color="blue-gray"
            className="my-4 text-center"
          >
            Or
          </Typography>
          <Button
            onClick={handleGoogleSignUp}
            className="mt-6 bg-transparent border-2 border-black text-black"
            fullWidth
          >
            Sign Up with Google
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?
            <Link href={"/login"} className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default SignUp;
