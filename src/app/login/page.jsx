import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = { title: "Log in – CoffeeShop.com" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to order and track your coffee."
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="font-semibold text-[var(--coffee)]">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}