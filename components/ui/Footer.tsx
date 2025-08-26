import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 mt-12 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-4">
        
        {/* Logo + Texte */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <Image
            src="/favicon.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-center md:text-left text-sm md:text-base">
            © {new Date().getFullYear()} QuizzFR — Fait avec ❤️
          </p>
        </div>

        {/* Liens externes */}
        <div className="flex items-center gap-4">
          {/* Buy Me A Coffee */}
          <a
            href="https://buymeacoffee.com/kesraoui"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kesraouimohamed/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 md:h-12 w-auto text-blue-700 dark:text-blue-400"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 12.25h-3v-5.5c0-1.379-.028-3.156-1.922-3.156-1.922 0-2.217 1.5-2.217 3.048v5.608h-3v-11h2.884v1.5h.041c.402-.763 1.381-1.563 2.844-1.563 3.041 0 3.598 2 3.598 4.598v6.465z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
