import { Bricolage_Grotesque, Atkinson_Hyperlegible } from "next/font/google";
import Link from "next/link";
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
  description: "A calmer place to find SPPU Computer Engineering notes, papers and practicals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div className="sheet">
          <header className="top">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">ON</span>
              OneNightRush
            </Link>
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
