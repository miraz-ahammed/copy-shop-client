import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = { title: "Sign up – CoffeeShop.com" };

export default function RegisterPage() {
  return (
    <AuthShell
      heading="Your next favorite cup is waiting."
      text="Create an account to order faster, save favorites and track every delivery."
      title="Create your account"
      subtitle="Join CoffeeShop.com in less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--coffee)]">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}