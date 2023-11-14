"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Convert", href: "/" },
  {
    name: "Rates",
    href: "/rates",
  },
  { name: "About", href: "/about" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="p-1 flex gap-2 justify-between border-2 border-border rounded-xl">
      {links.map((link) => (
        <Link
          key={link.name}
          href={pathname === link.href ? "" : link.href}
          className={clsx(
            "px-4 py-2 flex-1 text-center rounded-lg hover:text-primary-light transition-colors",
            {
              "bg-background-light": pathname === link.href,
            }
          )}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </nav>
  );
}
