import { Bricolage_Grotesque, Atkinson_Hyperlegible } from "next/font/google";
import Link from "next/link";
import MobileNav from "../components/MobileNav";
import "./globals.css";

const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "OneNightRush — SPPU study desk",
  description: "Find SPPU 2024 pattern engineering notes, previous-year papers and practicals for First Year and Computer Engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div className="sheet">
          <header className="top">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">ON</span>
              <span className="brand-copy">
                <span>OneNightRush</span>
                <span className="brand-subtitle">sppu study desk</span>
              </span>
            </Link>
            <nav className="main-nav" aria-label="Primary navigation">
              <Link className="nav-link" href="/">Home</Link>
              <Link className="nav-link" href="/browse">Browse subjects</Link>
              <a
                className="nav-link"
                href="https://github.com/omkar-2225/OneNightRush-SPPU/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                Feedback
              </a>
              <Link className="nav-link nav-cta" href="/browse">
                Get started
              </Link>
            </nav>
            <MobileNav />
            <span className="top-note">Made for the late study hours</span>
          </header>
          <main className="page">{children}</main>
          <footer className="foot">
            <p>Unofficial. Not affiliated with Savitribai Phule Pune University.</p>
            <p>
              <a href="https://github.com/omkar-2225/OneNightRush-SPPU/issues/new" target="_blank" rel="noopener noreferrer">
                Feedback &amp; corrections
              </a>
              {" · "}Take a breath. Then take the next page.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
