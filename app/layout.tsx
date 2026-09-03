import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sepsu Dev | Software Engineer",
  description: "Professional engineering portfolio of Sepsu Dev.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
