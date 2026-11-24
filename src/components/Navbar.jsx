"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiGrid, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient, useSession } from "@/liv/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false); // mobile menu
  const [profile, setProfile] = useState(false); // user dropdown
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // scroll korle navbar-e shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // page change hole menu bondho
  useEffect(() => {
    setOpen(false);
    setProfile(false);
  }, [pathname]);

  // baire click korle dropdown bondho
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfile(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    setProfile(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent bg-[var(--cream)]/90 backdrop-blur transition-shadow ${
        scrolled ? "border-[#ecdfcf] shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--coffee-dark)]">
          <span aria-hidden>☕</span> CoffeeShop.com
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <Link
                href={l.href}
                className={`block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "text-[var(--coffee)]" : "text-neutral-700 hover:text-[var(--coffee)]"
                }`}
              >
                {l.label}
              </Link>
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-[var(--coffee)]"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/menu"
            className="hidden rounded-full bg-[var(--coffee)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--coffee-dark)] sm:inline-block"
          >
            Order Now
          </Link>

          {/* auth area */}
          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-[#ecdfcf]" />
          ) : user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfile((p) => !p)}
                aria-label="Account menu"
                aria-expanded={profile}
                className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-[var(--forest)] text-sm font-semibold text-white"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="size-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  initial
                )}
              </button>
              <AnimatePresence>
                {profile && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-[#ecdfcf] bg-white p-2 shadow-lg"
                  >
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-neutral-500">{user.email}</p>
                    </div>
                    <div className="my-1 h-px bg-[#f1e7da]" />
                    <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[var(--cream)]">
                      <FiUser /> My profile
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[var(--cream)]">
                        <FiGrid /> Admin dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-[var(--coffee)]">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[var(--coffee)] px-4 py-2 text-sm font-semibold text-[var(--coffee)] transition hover:bg-[var(--coffee)] hover:text-white"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full text-xl text-[var(--coffee-dark)] lg:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#ecdfcf] bg-[var(--cream)] lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      isActive(l.href) ? "bg-white text-[var(--coffee)]" : "text-neutral-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <Link href="/menu" className="flex-1 rounded-full bg-[var(--coffee)] py-3 text-center text-sm font-semibold text-white">
                  Order Now
                </Link>
                {!user && !isPending && (
                  <Link href="/login" className="flex-1 rounded-full border border-[var(--coffee)] py-3 text-center text-sm font-semibold text-[var(--coffee)]">
                    Log in
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}