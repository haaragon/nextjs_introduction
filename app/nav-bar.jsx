"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_EVENT, isLoggedIn, logout } from "@/auth.js";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    function syncLoggedIn() {
      setLoggedIn(isLoggedIn());
    }

    syncLoggedIn();
    window.addEventListener(AUTH_EVENT, syncLoggedIn);
    return () => window.removeEventListener(AUTH_EVENT, syncLoggedIn);
  }, []);

  if (!loggedIn) {
    return null;
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <nav className="bg-slate-900">
      <ul className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="ml-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
