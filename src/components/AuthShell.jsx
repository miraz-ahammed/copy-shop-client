"use client";
import { motion } from "framer-motion";

// bame animated coffee panel, dane form. mobile-e panel lukiye jay.
const beans = [
  { top: "12%", left: "12%", size: 28, delay: 0 },
  { top: "22%", left: "78%", size: 36, delay: 0.8 },
  { top: "62%", left: "8%", size: 40, delay: 1.4 },
  { top: "74%", left: "70%", size: 26, delay: 0.4 },
  { top: "45%", left: "88%", size: 20, delay: 1.9 },
];

export default function AuthShell({ title, subtitle, children, footer, heading, text }) {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* left panel (desktop only) */}
      <div className="relative hidden overflow-hidden bg-[var(--forest)] lg:block">
        {beans.map((b, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute select-none"
            style={{ top: b.top, left: b.left, fontSize: b.size }}
            animate={{ y: [0, -18, 0], rotate: [0, 15, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          >
            🫘
          </motion.span>
        ))}

        <div className="relative flex h-full flex-col items-center justify-center px-12 text-center text-white">
          {/* cup + steam */}
          <div className="relative mb-6">
            <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 gap-3">
              {[0, 0.5, 1].map((d) => (
                <motion.span
                  key={d}
                  className="block h-10 w-1.5 rounded-full bg-white/50 blur-[2px]"
                  animate={{ y: [0, -22], opacity: [0, 0.8, 0], scaleY: [0.6, 1.2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: d }}
                />
              ))}
            </div>
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}
            >
              ☕
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold leading-tight xl:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {heading || "Good Coffee, Good Mood."}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-sm text-white/75"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {text || "Freshly brewed, delivered fast. Sign in and order your favorite cup in seconds."}
          </motion.p>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-[var(--coffee)]/50 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* right: form */}
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[var(--coffee)]/10 blur-3xl lg:hidden"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
        >
          <h1 className="text-3xl font-bold text-[var(--coffee-dark)]">{title}</h1>
          <p className="mt-2 text-sm text-neutral-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-neutral-600">{footer}</p>
        </motion.div>
      </div>
    </section>
  );
}