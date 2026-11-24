"use client";
import { motion } from "framer-motion";
import { FiAward, FiCoffee, FiTruck, FiSmile } from "react-icons/fi";

const features = [
  { icon: FiAward, label: "Premium Quality" },
  { icon: FiCoffee, label: "Freshly Brewed" },
  { icon: FiTruck, label: "Fast Delivery" },
  { icon: FiSmile, label: "100% Satisfaction" },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-[#ecdfcf] bg-white p-3 shadow-sm sm:gap-4 sm:p-4 md:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--cream)] px-3 py-5 text-center"
          >
            <f.icon className="text-2xl text-[var(--coffee)]" />
            <span className="text-sm font-semibold text-[var(--coffee-dark)]">{f.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}