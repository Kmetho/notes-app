"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="absolute bottom-[0px] right-[0px] p-2.5">
      <p className="bubbles text-">cute notes © {year}</p>
    </div>
  );
}
