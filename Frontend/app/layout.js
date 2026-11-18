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
  title: "OneNightRush",
  description: "Notes, past papers and what to study first for SPPU exams. Free, no login.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div className="sheet">
          <header className="top">
            <Link href="/" className="brand">
              OneNightRush
            </Link>
          </header>
          <main className="page">{children}</main>
          <footer className="foot">
            <p>Unofficial. Not affiliated with Savitribai Phule Pune University.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
