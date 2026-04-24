'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  
  const linkStyles = (path: string) => `
    text-sm font-medium transition-all duration-200
    ${pathname === path 
      ? 'text-white' 
      : 'text-zinc-400 hover:text-white'}
  `;

  return (
    <nav className="fixed top-6 w-full z-50 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between p-2 sm:p-3 bg-zinc-950 border border-zinc-800 rounded-full shadow-2xl">
        
        
        <Link
          href="/dashboard"
          className="pl-4 text-lg font-bold tracking-tighter text-white hover:opacity-80 transition"
        >
          Hookboost
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {isSignedIn && (
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className={linkStyles('/dashboard')}>
                Dashboard
              </Link>
              <Link href="/history" className={linkStyles('/history')}>
                History
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 pr-2">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-white cursor-pointer hover:text-white transition px-3">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    className="text-sm  px-5 py-2 rounded-full bg-[#0046FF] text-white hover:bg-blue-500  cursor-pointer  transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center scale-90">
                <UserButton appearance={{ elements: { userButtonAvatarBox: 'size-9' } }} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden mr-2 p-2 text-zinc-400 hover:text-white transition"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 flex flex-col gap-5"
          >
            {isSignedIn && (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="text-base font-medium text-white hover:text-white">
                  Dashboard
                </Link>
                <Link href="/history" onClick={() => setOpen(false)} className="text-base font-medium text-white hover:text-white">
                  History
                </Link>
                <hr className="border-zinc-800" />
              </>
            )}

            {!isSignedIn ? (
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <button className="w-full text-sm py-3 text-white border border-zinc-800 rounded-xl hover:bg-zinc-900 transition">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="w-full text-sm py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Account Settings</span>
                <UserButton />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}