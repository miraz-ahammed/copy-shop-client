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

function strength(p) {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const levels = [
  { label: "Too short", color: "#d1d5db" },
  { label: "Weak", color: "#ef4444" },
  { label: "Okay", color: "#f59e0b" },
  { label: "Good", color: "#84cc16" },
  { label: "Strong", color: "#16a34a" },
];

export default function RegisterForm() {
  const router = useRouter();
  const controls = useAnimationControls();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const score = form.password ? strength(form.password) : 0;

  const fail = (msg) => {
    controls.start(shake);
    toast.error(msg);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return fail("Password must be at least 6 characters");
    if (form.password !== form.confirm) return fail("Passwords do not match");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) return fail(error.message || "Could not create account");
    toast.success("Account created!");
    router.push("/");
    router.refresh();
  };

  return (
    <motion.div animate={controls}>
      <motion.form onSubmit={onSubmit} variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
        <motion.div variants={item}>
          <TextField name="name" isRequired value={form.name} onChange={set("name")}>
            <Label>Full name</Label>
            <Input aria-label="Full name" placeholder="Your name" className="w-full" />
            <FieldError />
          </TextField>
        </motion.div>

        <motion.div variants={item}>
          <TextField name="email" type="email" isRequired value={form.email} onChange={set("email")}>
            <Label>Email</Label>
            <Input aria-label="Email" placeholder="you@example.com" className="w-full" />
            <FieldError />
          </TextField>
        </motion.div>

        <motion.div variants={item}>
          <PasswordField placeholder="Min 6 characters" value={form.password} onChange={set("password")} />
          {form.password && (
            <div className="mt-2">
              <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${Math.max(score, 1) * 25}%`, backgroundColor: levels[score].color }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">{levels[score].label}</p>
            </div>
          )}
        </motion.div>

        <motion.div variants={item}>
          <PasswordField
            name="confirm"
            label="Confirm password"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={set("confirm")}
          />
        </motion.div>

        {/* Create account button */}
        <motion.div variants={item} whileTap={{ scale: 0.97 }}>
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#6b3a1f] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#4a2611] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && (
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            Create account
          </button>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="h-px flex-1 bg-neutral-300" /> or <span className="h-px flex-1 bg-neutral-300" />
        </motion.div>

        <motion.div variants={item} whileTap={{ scale: 0.97 }}>
          <GoogleButton label="Sign up with Google" />
        </motion.div>
      </motion.form>
    </motion.div>
  );
}