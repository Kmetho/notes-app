"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <p className="bubbles">cute notes © {year}</p>
    </div>
  );
}
