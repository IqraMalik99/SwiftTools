"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession(); // get user session

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-2 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full bg-white/80 backdrop-blur-md shadow-lg px-4 sm:px-6 py-2 sm:py-3">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="sm:w-[150px] sm:h-[150px]"
            />
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm text-gray-700">
            <a className="hover:text-black" href="#">Tools</a>
            <a className="hover:text-black" href="#">Use cases</a>
            <a className="hover:text-black" href="#">Pricing</a>
            <a className="hover:text-black" href="#">API</a>
            <a className="hover:text-black" href="#">Docs</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!session?.user && (
              <button
                onClick={() => router.push("/login")}
                className="text-xs sm:text-sm text-gray-700 hover:text-black bg-transparent border-none cursor-pointer"
              >
                Log in
              </button>
            )}

            {!session?.user ? (
              <button
                onClick={() => router.push("/signup")}
                className="rounded-full bg-black px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm text-white hover:bg-gray-900"
              >
                Register
              </button>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full bg-black px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm text-white hover:bg-gray-900"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
