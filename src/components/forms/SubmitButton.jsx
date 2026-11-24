"use client";

export default function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#6b3a1f] px-6 text-sm font-semibold text-white shadow-md shadow-[#6b3a1f]/25 transition hover:bg-[#4a2611] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}