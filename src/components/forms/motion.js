export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

// vul hole form kapbe
export const shake = { x: [0, -10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45 } };