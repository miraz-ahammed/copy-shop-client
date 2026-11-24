"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/liv/auth-client";
import GoogleButton from "@/components/GoogleButton";
import PasswordField from "./PasswordField";
import { container, item, shake } from "./motion";

export default function LoginForm() {
  const router = useRouter();
  const controls = useAnimationControls();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      controls.start(shake);
      return toast.error(error.message || "Invalid email or password");
    }
    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  return (
    <motion.div animate={controls}>
      <motion.form onSubmit={onSubmit} variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
        <motion.div variants={item}>
          <TextField name="email" type="email" isRequired value={email} onChange={setEmail}>
            <Label>Email</Label>
            <Input aria-label="Email" placeholder="you@example.com" className="w-full" />
            <FieldError />
          </TextField>
        </motion.div>

        <motion.div variants={item}>
          <PasswordField placeholder="Your password" value={password} onChange={setPassword} />
        </motion.div>

        {/* Log in button */}
        <motion.div variants={item} whileTap={{ scale: 0.97 }}>
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#6b3a1f] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#4a2611] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && (
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            Log in
          </button>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="h-px flex-1 bg-neutral-300" /> or <span className="h-px flex-1 bg-neutral-300" />
        </motion.div>

        <motion.div variants={item} whileTap={{ scale: 0.97 }}>
          <GoogleButton />
        </motion.div>
      </motion.form>
    </motion.div>
  );
}