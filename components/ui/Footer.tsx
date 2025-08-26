import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center md:flex-row justify-center  md:gap-16 py-6 mt-12 border-t text-center text-gray-500 bg-white dark:bg-black">
      <div>
        © {new Date().getFullYear()} QuizzFR — Fait avec ❤️
      </div>
      <div className="mt-2">
        <a
          href="https://buymeacoffee.com/kesraoui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="inline h-10"
          />
        </a>
      </div>
    </footer>
  );
}