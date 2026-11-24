import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CoffeeShop.com – Good Coffee, Good Mood",
  description: "Premium coffee, freshly brewed and delivered fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </body>
    </html>
  );
}