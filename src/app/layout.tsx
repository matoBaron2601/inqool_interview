import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../utils/ReactQueryProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Baron's Inqool Interview",
  description: ":) hope you will like it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main>
            <div className="relative">
              <header className="fixed top-0 left-0 w-full h-20 bg-gray-400 text-white flex items-center justify-between px-4 z-10">
                <div className="flex gap-8 ml-6">
                  <Link className="text-lg font-bold" href="/users">
                    Users
                  </Link>
                  <Link className="text-lg font-bold" href="/animals">
                    Animals
                  </Link>
                </div>
              </header>
              <div className="flex justify-center p-4 mt-20">{children}</div>
            </div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
