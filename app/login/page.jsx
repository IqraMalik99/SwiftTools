"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT GRADIENT */}
      <div className="hidden md:flex flex-col justify-end p-10 bg-linear-to-br from-sky-300 via-purple-200 to-pink-300">
        <h2 className="text-2xl font-semibold text-black">
          Welcome to SwiftTools <span className="font-normal">1.0</span>
        </h2>
        <p className="mt-2 max-w-sm text-sm text-black">
          The all-in-one toolbox that fits your daily workflow.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-8 text-center">
            <Image
              src="/logo.png"
              alt="SwiftTools"
              width={130}
              height={130}
              className="mx-auto cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="mt-5 text-lg font-semibold text-gray-900">
              Ready to get things done ?
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Access your tools and manage your digital tasks in seconds.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mb-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm text-black">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-gray-300 pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-black">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-gray-300 pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>Remember for 30 days</span>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full rounded-full py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Connect */}
            <div className="text-center w-full rounded-full border border-gray-300 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
              Connect with DIGITALY
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link href="/signup" className="font-medium text-gray-900">
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
