"use client";

import Link from "next/link";
import { Check, Star, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-linear-to-r from-[#f8f7ff] via-[#fffbfb] to-[#fffdf5] px-4 py-10 flex flex-col items-center">

      {/* Header */}
      <div className="text-center mb-10 max-w-4xl">
        <Link href="/">
        <img src="/logo.png" className="w-48 mx-auto mt-5" />
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5">
          Pricing
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Simple plans for Swift Tools users
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-5 items-stretch">

        {/* Free Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full min-h-130 shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Free</h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
              Current
            </span>
          </div>

          <div className="mb-2 text-sm text-gray-500">
            Start exploring Swift Tools for free
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">$0</span>
            <span className="text-xs text-gray-500"> /month</span>
          </div>

          <ul className="space-y-3 text-sm flex-1">
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              Limited documents / month
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              Basic PDF tools
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              Web access
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <Check className="w-5 h-5 text-gray-300" />
              No ads
            </li>
          </ul>

          <button
            disabled
            className="mt-6 w-full py-3 rounded-xl text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Card */}
        <div className="bg-gray-50 rounded-xl border border-gray-900 p-6 flex flex-col relative h-full min-h-[520px] shadow-lg hover:shadow-xl transition-shadow">

          <span className="text-[10px] w-16 mb-2 px-2 py-0.5 rounded-full bg-black text-white flex items-center gap-1 font-medium">
            <Star className="w-3 h-3" />
            Popular
          </span>

         

          <div className="mb-4">
             <div className="mb-2 text-sm text-gray-500">
            Unlock the full power of Swift Tools and save time every day
          </div>
            <span className="text-3xl font-bold text-gray-900">$5</span>
            <span className="text-xs text-gray-500"> /month</span>
          </div>

          <ul className="space-y-3 text-sm flex-1">
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              Unlimited documents
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              All Swift tools
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              Web + Mobile + Desktop
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              No ads
            </li>
          </ul>

          <Link
            href="/checkout"
            className="mt-6 w-full py-3 rounded-xl text-sm bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-900 transition font-medium"
          >
            <Zap className="w-5 h-5" />
            Upgrade to Premium
          </Link>

          <p className="text-xs text-gray-400 mt-3 text-center">
           Secure. Private. In your control
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 mt-8 text-center max-w-md">
        Get more done faster with Swift Tools — upgrade now for unlimited access!
      </p>
    </main>
  );
}
