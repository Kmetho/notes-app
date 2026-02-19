"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 right-0 p-2 sm:p-2.5">
      <p className="font-[Rubik_Bubbles] text-white text-xs sm:text-sm">
        cute notes © {year}
      </p>
    </div>
  );
}
