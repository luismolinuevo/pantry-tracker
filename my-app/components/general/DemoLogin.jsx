"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";
import { Button } from "../../material_tailwind";

export default function DemoLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_DEMO_LOGIN);
  const [password, setPassword] = useState(
    process.env.NEXT_PUBLIC_DEMO_LOGIN_PASSWORD
  );
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
  return <Button onClick={handleLogin}>Demo Login</Button>;
}
