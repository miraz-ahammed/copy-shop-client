"use client";
import { useState } from "react";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({ label = "Password", placeholder, value, onChange, name = "password" }) {
  const [show, setShow] = useState(false);
  return (
    <TextField name={name} type={show ? "text" : "password"} isRequired value={value} onChange={onChange}>
      <Label>{label}</Label>
      <div className="relative">
        <Input aria-label={label} placeholder={placeholder} className="w-full pr-11" />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-lg text-neutral-500 hover:text-[#6b3a1f]"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <FieldError />
    </TextField>
  );
}