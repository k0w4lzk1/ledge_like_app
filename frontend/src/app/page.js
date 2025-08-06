"use client";

import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "./components/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="student" />
      <div className="ml-0 md:ml-20 lg:ml-64 p-6">
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                Welcome to your sidebar demo! The sidebar is now working with:
              </li>
              <li className="tracking-[-.01em]">
                ✅ No external dependencies (no lucide-react, no Apollo, no complex backend)
              </li>
              <li className="tracking-[-.01em]">
                ✅ Responsive design (mobile, tablet, desktop)
              </li>
              <li className="tracking-[-.01em]">
                ✅ Role-based navigation (student, mentor, admin)
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                href="/demo"
                className="rounded-full border border-solid border-blue-600 transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                View Demo Page
              </Link>
              <a
                className="rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read our docs
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
