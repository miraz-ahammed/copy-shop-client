"use client";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/liv/auth-client";

export default function GoogleButton({ label = "Continue with Google" }) {
  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "Google sign-in failed");
  };

  return (
    <Button variant="outline" fullWidth onPress={handleGoogle}>
      <FcGoogle size={20} /> {label}
    </Button>
  );
}