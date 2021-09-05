import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spacer } from "../components/Spacer";
import { ReactNode } from "react";

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  const router = useRouter();

  if (!href.startsWith("/")) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a className={router.asPath === href ? "active" : ""}>{children}</a>
    </Link>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <NavLink href="/">Mint</NavLink>
        <Spacer.Horizontal inline size={60} />
        <NavLink href="/about">About</NavLink>
        <Spacer.Horizontal inline size={60} />
        <NavLink href="https://opensea.io/collection/openpalette">
          OpenSea →
        </NavLink>
        <Spacer.Horizontal inline size={60} />
        <NavLink href="https://twitter.com/open_pal">Twitter →</NavLink>
        {/* <Spacer.Horizontal inline size={60} />
        <NavLink href="https://discord.gg/2ZXd7hfa">Discord →</NavLink> */}
      </header>
      <Spacer.Vertical size={20} />
      <Component {...pageProps} />
    </>
  );
}
