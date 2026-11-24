"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--coffee)] shadow-sm"
          >
            <span className="size-1.5 rounded-full bg-[var(--coffee)]" /> Premium Coffee Experience
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--coffee-dark)] sm:text-6xl lg:text-7xl"
          >
            Good Coffee
            <span className="block text-[var(--coffee)]">Good Mood</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-5 max-w-md text-base text-neutral-600 sm:text-lg">
            Discover the perfect blend of taste, quality and comfort at CoffeeShop.com.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--coffee)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--coffee-dark)]"
            >
              Order Now <FiArrowRight />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[var(--coffee-dark)] hover:bg-white"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm">
                <FiPlay className="ml-0.5" />
              </span>
              Watch Video
            </Link>
          </motion.div>
        </div>

        {/* Hero image: public/images/hero-coffee.png rakhle eta dekhabe, na thakle ☕ placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <motion.div
            className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gradient-to-br from-[#e9d2b6] to-[var(--coffee)]/70"
            animate={{ borderRadius: ["45% 55% 60% 40% / 50% 45% 55% 50%", "55% 45% 40% 60% / 45% 55% 50% 55%", "45% 55% 60% 40% / 50% 45% 55% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual() {
  // image na thakle fallback
  return (
    <div className="relative size-3/4">
      <Image
        src="/images/hero-coffee.png"
        alt="A cup of latte with art"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 400px"
        className="object-contain drop-shadow-2xl"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <span className="absolute inset-0 -z-10 flex items-center justify-center text-[8rem] sm:text-[10rem]">☕</span>
    </div>
  );
}